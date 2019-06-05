const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const WorkPerUser = require('../models/WorkPerUser')
const User = require('../models/User')
const Room = require('../models/Room')


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.post('/', auth, (req, res) => {

    const { googleId, email, name, imageUrl } = req.body.profileObj

    User.findOne({ email }).then(

        user => {
            if (!user) {
                const user = new User({
                    googleId: googleId,
                    name: name,
                    email: email,
                    imageUrl: imageUrl,
                    room: 'testRoom',
                    rol: 'Profesor'
                })
                user.save()

                jwt.sign(
                    JSON.parse(JSON.stringify(user)),
                    config.get('jwtSecret'),
                    (err, token) => {
                        if (err) throw err;

                        //Devuelve por consola la info del usuario
                        res.json({
                            token,
                            user
                        })
                    }
                )
            }
            else {
                jwt.sign(
                    JSON.parse(JSON.stringify(user)),
                    config.get('jwtSecret'),
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user
                        })
                    }
                )
            }
        }
    )

    //TODO lvl 4, agrega 30 usuarios bot a la bbdd al iniciar sesión
    // for (let i = 0; i < 30; i++) {      
    //     let user2 = new User({
    //         googleId: i,
    //         name: "botUser"+i,
    //         email: "botUser"+i+"@iesfbmoll.org",
    //         imageUrl: "https://www.sideshow.com/storage/product-images/2172/r2-d2-deluxe_star-wars_feature.jpg",
    //         room: 'testRoom',
    //         rol: ''
    //     })
    //     console.log('user', user2)
    //     user2.save()
    // }
    res.status(200)
})

router.post('/addRandoms'), (req, res)=>{
   
    for (let i = 0; i < 30; i++) {      
        let user = new User({
            googleId: i,
            name: "botUser"+i,
            email: "botUser"+i+"@iesfbmoll.org",
            imageUrl: "https://www.sideshow.com/storage/product-images/2172/r2-d2-deluxe_star-wars_feature.jpg",
            room: 'testRoom',
            rol: ''
        })
        console.log('user', user)
        user.save()
    }
    res.status(200)
}

//TODO lvl 5 crea/une al usuario a la sala
router.post('/addRoom', (req, res) => {

    const sala = req.body.sala
    const token = req.body.token

    //TODO lvl 1 FIX actualizar sala
    Room.findOne({ id: sala }).then(
        room => {
            console.log('sala1 :', sala);
            const decoded = jwt.verify(token, config.jwtSecret)
            console.log('decoded :', decoded);
            if (room) {
                User.updateOne({ _id : decoded.id }, 
                    { $set:{ room : "testRoom" }},
                    ((err, user) => {
                        console.log('user :', user);
                        //Actualizamos token     
                        decoded.room = room.id
                        jwt.sign(
                            decoded,
                            config.get('jwtSecret'),
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({ msg: "Usuario agregado a la sala", token: token })
                            }
                        )
                        })
                )}

            //TODO lvl 3, TEMP: si no encuentra la sala la crea
            else {
                const room = new Room({
                    id: sala,
                    name: "testRoom",
                    description: "Sala " + sala,
                    teacher: "Juanmi"
                })
                room.save()

                User.updateOne({ id: decoded.id }, 
                    { $set:{ "room": sala }}).then(
                    user => {
                console.log('user2 :', user);

                        decoded.room = room.id
                        //Actualizamos token                        
                        jwt.sign(
                            decoded,
                            config.get('jwtSecret'),
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({ msg: "Usuario y sala creados correctamente", token: token })
                            }
                        )
                        console.log('user :', user);
                    }
                )
            }
        }

    )
})

router.post('/allUsers', (req, res) => {

    User.find({}).then((users=>{
        res.json(users)
    }))

})

router.post("/userInfo", (req, res) => {

    WorkPerUser.find({userId : req.body.data.googleId}).exec((err, results) => {
        let totalTasks = results.length
        let taskFinished = 0
        let totalTokens = 0
        let unfinishedTasks = 0
        let actualStates = [0,0,0,0]
        let userName = results[0].name
        let imageUrl= results[0].imageUrl
        
        results.forEach((result)=>{
            result.completed ? taskFinished++ : ""
            totalTokens += result.totalTokens

            //actualStateCount
            result.actualState === 0 ? actualStates[0]++ : null
            result.actualState === 1 ? actualStates[1]++ : null
            result.actualState === 2 ? actualStates[2]++ : null
            result.actualState === 3 ? actualStates[3]++ : null

        })
        unfinishedTasks = totalTasks-taskFinished
        res.send({totalTasks, taskFinished, totalTokens, unfinishedTasks, actualStates, userName, imageUrl})
      });
})

router.post("/allUserInfo", (req, res) => {


    

    WorkPerUser.find({room : req.body.data.room}).exec((err, results) => {
        let totalTasks = results.length
        let taskFinished = 0
        let totalTokens = 0
        let unfinishedTasks = 0
        let actualStates = [0,0,0,0]
        
        results.forEach((result)=>{
            result.completed ? taskFinished++ : ""
            totalTokens += result.totalTokens

            //actualStateCount
            result.actualState === 0 ? actualStates[0]++ : null
            result.actualState === 1 ? actualStates[1]++ : null
            result.actualState === 2 ? actualStates[2]++ : null
            result.actualState === 3 ? actualStates[3]++ : null

        })
        unfinishedTasks = totalTasks-taskFinished
        res.send({totalTasks, taskFinished, totalTokens, unfinishedTasks, actualStates})
      });
})



router.get('/checkUser', (req, res) => {
    console.log('req', req)
    res.json(req)
})

module.exports = router