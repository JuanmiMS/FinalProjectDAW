const mongoose =require('mongoose');
const Schema = mongoose.Schema

const WorkSchema = Schema({
    Title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    }

})



module.exports = Work = mongoose.model('work', WorkSchema)