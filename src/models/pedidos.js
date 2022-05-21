const mongoose = require('mongoose')


const StatusDoPedido = Object.freeze({
    
    pendente: 0,
    em_preparo: 1,
    em_entrega: 2,
    entregue: 3,
    cancelado: 4,
}) 


const schema = new mongoose.Schema({

    pedidios:[
        {
            produtoId:{type: Object, ref:'Pedidos' },
            qtd: {type: Number, min: 0, default: 0},
            produtoNome: { type: String },
            produtoPreco: { type: Number },
        }
    ],

    nome: { type: Object, ref: 'Clientes'},
    nomeCliente: { type: String },
    data: { type: Date },
    status: { type: Number, enum: [0,1,2,3,4], default: 0},
    preco: { type: Number }

})

const Model = mongoose.model('pedidos', schema)

module.exports = Model


