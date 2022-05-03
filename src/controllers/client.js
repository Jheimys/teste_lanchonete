const ClientModel = require('../models/client')
const mongoose = require('mongoose')

async function get(req, res){
 
    const {id} = req.params

    const obj = id ? {_id: id} : null

    const client = await ClientModel.find(obj)

    res.send(client)
}


//Recebendo dados via post
async function post(req, res){

    const {name, email, telefone, endereco,} = req.body

    const client = new ClientModel({
        name,
        email,
        telefone,
        endereco,
    })

    client.save()
    res.send({
        message: 'success'
    })

    }

//Atualizando com o método PUT
async function put(req, res){
    const {id} = req.params
    console.log('id', id, typeof id)
    const client = await ClientModel.findOneAndUpdate({_id: id}, req.body, {new:true})

    res.send({
        message: 'success',
        client,
    })
}
//Removendo - DELETE
async function remove(req,res){

    const{ id } = req.params
    //const remove = await ProductsModel.deleteOne({_id: mongoose.Schema.Types.ObjectId(id)})
    const remove = await ClientModel.deleteOne({_id:id})

    console.log(remove)
    const message = remove.deletedCount ? 'success' : 'error'

    res.send({
        message,
    })
    
   
   
    /*
    if(!remove.ok){
        message = 'error'
    }

    res.send({
       message: 'success'
    })
*/
}

module.exports = {
    get,
    post,
    put,
    remove,
}



