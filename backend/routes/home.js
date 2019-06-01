const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Room = require('../models/Room')
const Work = require('../models/Work')
const WorkPerUser = require('../models/WorkPerUser')


router.post("/taskData", (req, res) => {

    //get total works
    WorkPerUser.find({userId : req.body.data.googleId}).exec((err, results) => {
        let totalTasks = results.length
        let taskFinished = 0
        let totalTokens = 0
        results.forEach((result)=>{
            result.completed ? taskFinished++ : ""
            totalTokens += result.totalTokens
        })
        res.send({totalTasks, taskFinished, totalTokens})
      });
})

router.post("/nextTask", (req, res) => {

    //get total works
    WorkPerUser.find({userId : req.body.data.googleId}).exec((err, results) => {
        let totalTasks = results.length
        let taskFinished = 0
        let totalTokens = 0
        results.forEach((result)=>{
            result.completed ? taskFinished++ : ""
            totalTokens += result.totalTokens
        })
        res.send({totalTasks, taskFinished, totalTokens})
      });
})

module.exports = router