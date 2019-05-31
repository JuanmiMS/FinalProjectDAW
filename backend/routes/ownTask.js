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
    let taskId = req.body.data.id
    let userId = req.body.data.googleId
    //Obtenemos titulo y descripción
    Work.findOne({ "_id": taskId }, function (err, task) {
        WorkPerUser.findOne({ "workId": taskId, "userId": userId }, (err, userTask) => {
            if (userTask !== null){
            let resTask = {
                title: task.title,
                description: task.description,
                date: task.date,
                taskOwnId: userTask.id,
                completed: userTask.completed,
                totalTokens: userTask.totalTokens,
                actualState: userTask.actualState
            }
            res.send(resTask)
        }
        else{
            res.status(404).json({msg : "No encontrado"})
        }
        })
    });
})

router.post('/updateTaskFinish', (req, res) => {
    let id = req.body.data.id
    let compl = !req.body.data.completed

    console.log('id, compl', id, compl)

    WorkPerUser.updateOne({ _id: id },
        { $set: { completed: compl } },
        (err, task) => {
            res.send(task)
        })

})

router.post('/deleteTask', (req, res) => {
    let fatherId = req.body.data.id
    let googleId = req.body.data.googleId
    // console.log('id, compl', id, googleId)
    
    try {
        Work.deleteOne({ _id: fatherId }, (req, task) => {
            console.log('object1 :', task);
        }).catch((err)=>{
            res.status(404).json({msg: "Tarea no encontrada"})
        })
    
        WorkPerUser.deleteMany({ workId: fatherId }, (req, task) => {
            console.log('object2 :', task);
        }).catch((err)=>{
            res.status(404).json({msg: "Tarea no encontrada"})
        })

        res.json({msg: "Eliminado"})
    } catch (error) {
        res.status(404).json({msg: "Tarea no encontrada"})
    }
})
router.post('/updateTaskTokens', (req, res) => {
    let id = req.body.data.id
    let tokens = req.body.data.tokens
    console.log('id, tokens :', id, tokens);
    WorkPerUser.updateOne({ _id: id },
        { $set: { totalTokens: tokens } },
        (err, task) => {
            res.send(task)
        })
})
router.post('/updateTaskState', (req, res) => {
    let id = req.body.data.id
    let state = req.body.data.state
    console.log('id, tokens :', id, state);
    WorkPerUser.updateOne({ _id: id },
        { $set: { actualState: state } },
        (err, task) => {
            res.send(task)
        })
})

module.exports = router