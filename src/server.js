const express = require('express')
const path = require('path')

const routes = require('./routes/routes')

const app = express()

//habilita para receberdados via post
app.use(express.urlencoded({extended:true}))

app.use('/api', routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listenig is port ${port} `))