
const bcrypt = require('bcrypt')
const SALT = 10

async function crypto(pwd){

    const saltDefine = await bcrypt.genSalt(SALT)
    console.log("salt ==>", saltDefine)

    const password = await bcrypt.hash(pwd, saltDefine)

    return password
}

module.exports ={
    crypto,
}