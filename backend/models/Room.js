const mongoose =require('mongoose');
const Schema = mongoose.Schema

const RoomSchema = Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    }

})



module.exports = Room = mongoose.model('room', RoomSchema)