const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')
const WorkPerUser = require('../models/WorkPerUser')

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
    work.save((err, workResponse) => {
        User.find({room: workResponse.room}, (err, users) => {
            
            users.forEach((user)=>{
                let assingWork = new WorkPerUser({
                    userId : user.googleId,
                    workId : workResponse.id,
                    completed : false,
                    totalTokens : 0,
                    room : workResponse.room
                })

                assingWork.save()
            })
    })
    res.json(work)
})
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

router.post('/seeUniqueWork', (req, res) => {

    Work.findOne({"_id" :  req.body.sendId.id}, function (err, work) {
        res.send(work);
    });
})

module.exports = router