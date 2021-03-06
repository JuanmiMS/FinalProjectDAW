const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')
const WorkPerUser = require('../models/WorkPerUser')

router.post('/add', (req, res) => {

    console.log('req.body.work', req.body.work)
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
        User.find({ room: workResponse.room }, (err, users) => {
            users.forEach((user) => {
                console.log('user :', user);
                let assingWork = new WorkPerUser({
                    userId: user.googleId,
                    workId: workResponse.id,
                    completed: false,
                    totalTokens: 0,
                    actualState : 0,
                    imageUrl : user.imageUrl,
                    name : user.name,
                    room: workResponse.room
                })

                assingWork.save()
            })
        }).catch((err=>{
            console.log(err)
        }))
        res.json(work)
    })
})

//TODO lvl 5 error set headers. Still works :S
router.post('/seeOwnTasks', (req, res) => {

    let taskMap = []
    WorkPerUser.find({ userId: req.body.data.userId, room: req.body.data.room }, (err, tasks) => {
        tasks.forEach((task, index) => {
            Work.findOne({ _id: task.workId }, (err, work) => {
                taskMap.push({
                    idWork: task.workId,
                    title: work.title,
                    description: work.description,
                    date : work.date,
                    completed: task.completed,
                    totalTokens: task.totalTokens,
                }
                )
            }).then(()=>{
                // console.log('taskMap :', taskMap);
                res.send(taskMap)
            }
            ).catch((err=>{
                console.log(err)
            }))
        }
        )
    }
    )
})


router.post('/seeAll', (req, res) => {

    Work.find({ room: req.body.data.room }, function (err, works) {
        let workMap = [];
        works.forEach(function (work, index) {
            workMap[index] = work;
        });
        res.send(workMap);
    });
})
router.post('/seeUniqueWork', (req, res) => {
    console.log('req.body.sendId.id', req.body.sendId.id)
    Work.findOne({ "_id": req.body.sendId.id }, function (err, work) {
        res.send(work);
    });
})

module.exports = router