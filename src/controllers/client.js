const ClientModel = require('../models/client')
const mongoose = require('mongoose')
const { find, findOne } = require('../models/client')

async function get(req, res){
 
    const {id} = req.params

    const obj = id ? {_id: id} : null

    const client = await ClientModel.find(obj)

    res.send(client)
}


//Recebendo dados via post
async function post(req, res){

    const {name, email, telefone, endereco,} = req.body

    if (!name || !email || !telefone || !endereco) {
        let fields = '';
        if (!name) fields += 'nome'
        if (!email) fields += (fields.length > 0 ? ', ' : '') + 'email'
        if (!telefone) fields += (fields.length > 0 ? ', ' : '') + 'telefone'
        if (!endereco) fields += (fields.length > 0 ? ', ' : '') + 'endereço'
        return res.status(400).json({message:"Requisição mal formatada. Favor fornecer:" + fields});
    }

    const client = new ClientModel({
        name,
        email,
        telefone,
        endereco,
    })

    try {
        await client.save();  
        return res.status(201).send({
            message: "success"
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send({err})
    }

    
    // if(!name){
    //     res.status(422).json({message:'O nome é obrigatório!'})
    //     return
    // }

    // if(!email){
    //     res.status(422).json({message:'O email é obrigatório!'})
    //     return
    // }

    // if(!telefone){
    //     res.status(422).json({message:'O telefone é obrigatório!'})
    //     return
    // }

    // if(!endereco){
    //     res.status(422).json({message:'O endereco é obrigatório!'})
    //     return
    // }
    
    //check if client exists

    // const clientExists = await ClientModel.findOne({email: email})


    // if(clientExists){
    //     res.status(422).json({
    //         message:'Por favor, digite outro email!' 
    //     })
        
    //     return
    // }
   

    // client.save()
    // res.send({
    //     message: 'success'
    // })


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



