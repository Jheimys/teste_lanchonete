const PedidiosModel = require('../models/pedidos')

async function get(req, res){
 
    const {id} = req.params

    const obj = id ? {_id: id} : null

    const pedidios = await PedidosModel.find(obj)

    res.send(pedidos)
}


module.exports = {
    get,
}