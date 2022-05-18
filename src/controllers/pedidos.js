const PedidosModel = require('../models/pedidos')

async function get(req, res){
 
    const {id} = req.params

    const obj = id ? {_id: id} : null

    const pedidos = await PedidosModel.find(obj)

    res.send(pedidos)
}

//recebendo dados via post
async function post(req,res){

    const {name,product, amount,data, status, } = req.body
 
 //registrando os dados
    const pedido = new PedidosModel({
        name,
        product,
        amount,
        data,
        status,
    })
    
    
    pedido.save()
    res.send({
        message: 'success'
    })
 }

module.exports = {
    get,
    post,
}

