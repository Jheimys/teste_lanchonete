const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require('./routes/routes')
const db = require('./database/db')

db.connect()
// createDefaultUser()
async function createDefaultUser() {

}
// TODO
// verificar se existe o usuario administrador
// caso nao exista, criar com valores padroes
/**
 * const defaultUser = {
 * login:
 * password
 * }
 * const adminUser = await AdmModel.find({login: defaultUser.login})
 * if (!adminUser) {
 * console.log('Usuario padrao nao encontrado. Registrando agora...')
 *  await AdmModel.create(defaultUser)
 * } else {
 * console.log('Usuario já cadastrado...')
 * }
 * 
 * 
 * {
 * login:
 * password:
 * }
 */

const app = express()


//habilita para receberdados via post
//app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())

app.use('/api', routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listenig is port ${port} `))