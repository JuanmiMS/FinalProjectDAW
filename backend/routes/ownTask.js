const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Work = require('../models/Work')
const WorkPerUser = require('../models/WorkPerUser')


router.post('/seeUniqueWork', (req, res) => {
    let taskId = req.body.sendId.id
    let userId = "107909904760798030707"
    //Obtenemos titulo y descripción
    Work.findOne({ "_id": taskId }, function (err, task) {
        console.log('task', task)
        WorkPerUser.findOne({"workId" : taskId, "userId" : userId}, (err, userTask)=>{
            let resTask = {
                title: task.title,
                description: task.description,
                date: task.date,
                taskOwnId : userTask.id,
                completed: userTask.completed,
                totalTokens: userTask.totalTokens,
                actualState: userTask.actualState
            }
            res.send(resTask)
        })
    });
})

router.post('/updateTaskFinish', (req, res) => {
    let id = req.body.sendId.id
    let compl = !req.body.sendId.completed

    console.log('id, compl', id, compl)

    WorkPerUser.updateOne({_id : id}, 
    { $set: { completed : compl } },
    (err, task) => {
        res.send(task)
    })

})

module.exports = router