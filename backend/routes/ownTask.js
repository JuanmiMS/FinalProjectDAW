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
            console.log('taskId, userId', taskId, userId)
            console.log('userTask', userTask)
            let resTask = {
                title: task.title,
                description: task.description,
                date: task.date,
                completed: userTask.completed,
                totalTokens: userTask.totalTokens,
                actualState: userTask.actualState
            }
            console.log('resTask :', resTask);
            res.send(resTask)
        })
        
    });
})

router.post('/updateTaskFinish', (req, res) => {

    

})

module.exports = router