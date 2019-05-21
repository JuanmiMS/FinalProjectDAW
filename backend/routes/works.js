const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')

router.post('/add', (req, res) => {

    const work = new Work({
        title: "PRUEBA "+ new Date(),
        description: "LOREM IPSUM CARPE DIEM",
        Date : new Date()
    })
    work.save()
    res.json(work)
})

module.exports = router