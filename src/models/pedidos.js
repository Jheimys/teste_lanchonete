const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    codigoCliente: Number,
    condigoProduto:Number,
    data: Number,
    status: String,

})

const Model = mongoose.model('pedido', schema)

module.exports = Model


