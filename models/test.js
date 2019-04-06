var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ansSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
})
const quesSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    isMultiple: {
        type: Boolean,
        required: true
    },
    answers:[ansSchema]
},{
    usePushEach: true
});

const testSchema = new Schema({
    number:{
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions:[quesSchema]
},{
    usePushEach: true
});

var Tests = mongoose.model('Test', testSchema);
module.exports = Tests;