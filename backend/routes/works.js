const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')

router.post('/add', (req, res) => {

    console.log('work', req.body.work)
    // const title = req.body.title
    // const description = req.body.description
    // const authorName = req.body.author
    // const authorGoogleId = req.body.authorGoogleId
    const {title, description, authorName, authorGoogleId, limitDate} = req.body.work

    const work = new Work({
        title,
        description,
        author : {
            authorName,
            authorGoogleId
        },
        date : limitDate
    })

    work.save()
    res.json(work)
})

module.exports = router