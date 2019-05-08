const mongoose =require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    datos: {
        type: Object,
        required: false,
    },
    register_Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema)