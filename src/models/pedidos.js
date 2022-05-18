const mongoose = require('mongoose')


const StatusDoPedido = Object.freeze({
    
    pendente: 0,
    em_preparo: 1,
    em_entrega: 2,
    entregue: 3,
    cancelado: 4,
}) 


const schema = new mongoose.Schema({

    name: String,
    // product: Array,
    product: [{
        qtd: Number,
        product: String
    }],
    amount: Number,
    data: Date,
    status: String,

})

const Model = mongoose.model('pedidos', schema)

module.exports = Model


