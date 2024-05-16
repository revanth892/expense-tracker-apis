const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const expense = new Schema({
    userid: {
        type: String,
        require: true,
        default: "NONE"
    },
    description: {
        type: String,
        require: true,
        default: "NONE"
    },
    amount: {
        type: Number,
        require: true,
        default: "NONE"
    },
    income: {
        type: Boolean,
        require: false,
        default: "NONE"
    },
    expense: {
        type: Boolean,
        require: false,
        default: "NONE"
    },
    date: {
        type: String,
        require: false,
        default: "NONE"
    },
    month:{
        type:String,
        require:false,
        default:"NONE"
    }
})

module.exports = mongoose.model('Expenses', expense)