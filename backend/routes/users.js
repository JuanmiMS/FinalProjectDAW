const express = require('express')
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.post('/', auth, (req, res) => {

    const { googleId, email, name, imageUrl } = req.body.profileObj

    User.findOne({ email }).then(
        user => {
            if(!user){
                const user = new User({
                    googleId: googleId,
                    name: name,
                    email: email,
                    imageUrl: imageUrl,
                    room: 'testRoom'
                })
                user.save()
                console.log("Nuevo usuario guardado")
            
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
            else{
                console.log("entra")
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
                console.log("entra222")

            }


        }
    )
})

router.get("/checkUser", (req, res)=>{
    console.log('req', req)
    res.json(req)
})

module.exports = router