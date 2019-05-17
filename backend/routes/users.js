const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.post('/', auth, (req, res) => {

    const { googleId, email, name, imageUrl } = req.body.profileObj

    User.findOne({ email }).then(
        user => {

            //Si el usuario ya ha sido registrado previamente
            // if (!user) return res.status(400).json({ msg: 'User already exists' })

            const newUser = new User({
                googleId: googleId,
                name: name,
                email: email,
                imageUrl: imageUrl,
                room: 'testRoom'
            })

            if(!user){
                newUser.save()
                console.log("guardado")
            }

            jwt.sign(
                JSON.parse(JSON.stringify(newUser)),
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;

                    //Devuelve por consola la info del usuario
                    res.json({
                        token,
                        newUser
                    })
                }
            )
        }
    )
})

router.get("/checkUser", (req, res)=>{
    console.log('req', req)
    res.json(req)
})

module.exports = router