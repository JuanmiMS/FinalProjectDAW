const mongoose =require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    googleId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false,
    },
    register_Date: {
        type: Date,
        default: Date.now
    }
})



module.exports = User = mongoose.model('user', UserSchema)