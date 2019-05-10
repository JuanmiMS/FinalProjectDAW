const mongoose =require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: false,
    },
    register_Date: {
        type: Date,
        default: Date.now
    }
})



module.exports = User = mongoose.model('user', UserSchema)