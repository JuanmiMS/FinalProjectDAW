const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.header('x-auth-token')

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', req.body.profileObj)


    const {givenName, email} = req.body.profileObj

    // if(!token) res.status(401).json({msg: 'No token, authorization denied'})

    try{
        // const decoded = jwt.verify(token, config.get('jwtSecret'))

        // console.log('decoded', decoded)
        
        // req.user = decoded;

        // //check de algunos campos
        // if(email !== "hola") {
        //     res.status(401).json({msg: 'Mail incorrecto'})
        // }
        // else{
        //     next();
        // }

        next()
        
    
    }
    catch(e){
        res.status(400).json({msg: 'Token is not valid'})
    }
}


module.exports = auth