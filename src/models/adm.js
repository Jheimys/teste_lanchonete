const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    login:{
      type:String,
      required: true,  
    },

    password:{
        type:String,
        required: true,  
      },

})

const Model = mongoose.model('adm', schema)

module.exports = Model