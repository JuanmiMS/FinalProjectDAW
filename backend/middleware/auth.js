const errors = require('../../config/error')
const config = require('config')

function auth(req, res, next) {
    const { email } = req.body.profileObj
    //check mail
    if (!email.includes("@" + config.get("emailDomain"))) {
        res.status(401).json({ msg: errors.invalidMail })
    }
    else {
        next();
    }

}


module.exports = auth