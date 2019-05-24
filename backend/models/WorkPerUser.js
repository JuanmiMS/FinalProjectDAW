const mongoose =require('mongoose');
const Schema = mongoose.Schema

const WorkPerUserSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    workId: {
        type: String,
        required: true
    },
    actualState: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    totalTokens : {
        type: Number,
        require: true
    },
    room : {
        type: String,
        require: true
    }
})

module.exports = workPerUser = mongoose.model('workPerUser', WorkPerUserSchema)