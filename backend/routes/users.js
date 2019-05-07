const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', (req, res) => {
   const {name, email} = req.body

    console.log('req.body :', req.body);

   if(!name){
       return res.status(400).json({msg: "Pon un nombre"})
   }

   User.findOne({email}).then(
       user=>{

           //Si el usuario ya ha sido registrado previamente
           if(user) return res.status(400).json({msg: 'User already exists'})

           const newUser = new User({
               name, email
           })
           
           newUser.save().then(user => {
               nuevoUser = {
                id: user.id, 
                name: user.name, 
                email: user.email,
                otro : "otro"
            }

            jwt.sign(
                nuevoUser, 
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
            
            
           })

       }
   )
})

module.exports = router