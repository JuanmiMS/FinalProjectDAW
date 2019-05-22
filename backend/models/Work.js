const mongoose =require('mongoose');
const Schema = mongoose.Schema

const WorkSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: Object,
        required: true
    }

})



module.exports = Work = mongoose.model('work', WorkSchema)