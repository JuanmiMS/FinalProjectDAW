const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

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
                    room: ''
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
})


router.post('/addRoom', (req, res) => {

    const sala = req.body.sala
    const token = req.body.token
    console.log('sala :', sala);
    console.log('token :', token);

    Room.findOne({ id: sala }).then(
        room => {
            if (room) {
                console.log("Sala encontrada")
            }
            //TODO lvl 3, TEMP: si no encuentra la sala la crea
            else {
                const room = new Room({
                    id: makeid(5),
                    name: "testRoom",
                    description: "Sala de prueba",
                    teacher: "Juanmi"
                })
                room.save()

                const decoded = jwt.verify(token, config.jwtSecret)

                User.findOneAndUpdate({ id: decoded.id }, { "room": room.id }).then(
                    user => {
                        decoded.room = room.id
                        //Actualizamos token                        
                        jwt.sign(
                            decoded,
                            config.get('jwtSecret'),
                            (err, token) => {
                                console.log('token :', token);
                                if (err) throw err;
                                res.status(200).json({ msg: "Usuario y sala creados correctamente", token: token })
                            }
                        )
                    }
                )
            }
        }

    )
})


router.get("/checkUser", (req, res) => {
    console.log('req', req)
    res.json(req)
})

module.exports = router