const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')

router.post('/add', (req, res) => {

    const { title, description, authorName, authorGoogleId, limitDate, room } = req.body.work

    const work = new Work({
        title,
        description,
        room,
        author: {
            authorName,
            authorGoogleId
        },
        date: limitDate
    })

    work.save()
    res.json(work)
})

router.post('/seeAll', (req, res) => {

    Work.find({room: req.body.data.room}, function (err, works) {
        let workMap = [];

        works.forEach(function (work, index) {
            workMap[index] = work;
        });
        res.send(workMap);
    });
})

module.exports = router