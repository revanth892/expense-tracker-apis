const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const user = new Schema({
     username: {
          type: String,
          require: true,
          default: "NONE"
     },
     password: {
          type: String,
          require: true,
          default: "NONE"
     }, email: {
          type: String,
          require: true,
          default: "NONE"
     }
})

module.exports = mongoose.model('Users', user)