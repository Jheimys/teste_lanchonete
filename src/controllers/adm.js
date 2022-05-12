const AdmModel = require('../models/adm')
const mongoose = require('mongoose')
const { find, findOne } = require('../models/adm')
const {crypto} = require('../utils/password')
const bcrypt = require('bcrypt');


async function get(req, res){

    const {id} = req.params

    const obj = id ? {_id: id} : null

    const adm = await AdmModel.find(obj)
    res.send(adm)
}

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


    const passwordCrypto = await crypto(password)
    
    const register = new AdmModel({
        login,
        password: passwordCrypto,
    })


    register.save()
    res.send({
        message: 'success'
    })

}







    // if (user) {
    // } else {
    // }
    // const register = new AdmModel({
        // login,
        // password: passwordCrypto,
    // })


    // register.save()




module.exports = {
    get,
    post,
}