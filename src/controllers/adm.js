const AdmModel = require('../models/adm')
const mongoose = require('mongoose')
const { find, findOne } = require('../models/adm')
const {crypto} = require('../utils/password')



//Recebendo dados via post
async function post(req, res){

    const {login, password,} = req.body

    const adm = new AdmModel({
        login,
        password,

    })

    if(!login){
        res.status(422).json({message:'O login é obrigatório!'})
        return
    }

    if(!password){
        res.status(422).json({message:'O password é obrigatório!'})
        return
    }

   
    adm.save()
    res.send({
        message: 'success'
    })

}



module.exports = {

    post,
}