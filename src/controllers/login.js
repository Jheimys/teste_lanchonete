const LoginModel = require('../models/login')
const mongoose = require('mongoose')
const { find, findOne } = require('../models/login')
const {crypto} = require('../utils/password')
const bcrypt = require('bcrypt');

async function get(req, res){

    const {id} = req.params

    const obj = id ? {_id: id} : null

    const logar = await LoginModel.find(obj)
    res.send(logar)
}



//Recebendo dados via post
async function post(req, res){

    const {login, password,} = req.body

    const logar = new LoginModel({
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
    
    const register = new LoginModel({
        login,
        password: passwordCrypto,
    })


    register.save()
    res.send({
        message: 'success'
    })

}



async function login(req, res){

    const {login, password,} = req.body
    
    if(!login){
        res.status(422).json({message:'O login é obrigatório!'})
        return
    }

    if(!password){
        res.status(422).json({message:'O password é obrigatório!'})
        return
    }

    
    let user = await LoginModel.findOne({
        login: login
       
    })

    if (!user) return res.status(403).send({message: "Login ou senha incorretos"});

    bcrypt.compare(password, user.password, (err, result) => {
        console.log("resultado do bcrypt.compare ==> ", result)
        if (result) {
            delete user.password
            const returnUser = {
                login: user.login
            }
            return res.send({
                message: 'success',
                user: returnUser
            })

        }
        return res.status(403).send({message: "Login ou senha incorretos"});
    })
}

module.exports = {
    get,
    post,
    login,
}