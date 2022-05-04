const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
      type:String,
      required: true,  
    },

    email:{
        type:String,
        required: true,
        unique: true 
    },

    telefone:{
        type:Number,
        required: true,  
      },

    endereco:{
        type:String,
        required: true,  
      },

    
})

const Model = mongoose.model('client', schema)

module.exports = Model