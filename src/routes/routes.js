
const router = require('express').Router()

// modo de controllers
const ProductsControllers = require('../controllers/products')
const ClientControllers = require('../controllers/client')
const PedidosControllers = require('../controllers/pedidos')
const AdmControllers = require('../controllers/adm')
const LoginControllers = require('../controllers/login')


//Rotas de produtos
router.get('/products/:id?',  ProductsControllers.get)
router.post('/products', ProductsControllers.post)
router.put('/products/:id', ProductsControllers.put)
router.delete('/products/:id', ProductsControllers.remove)

//Rotas de clientes
router.get('/client/:id?', ClientControllers.get)
router.post('/client', ClientControllers.post)
router.put('/client/:id', ClientControllers.put)
router.delete('/client/:id', ClientControllers.remove)

//Rotas de pedidos
router.get('/pedidos/:id?', PedidosControllers.get)
router.post('/pedidos', PedidosControllers.post )

//Rotas de adm
router.get('/adm/:id?', AdmControllers.get)
router.post('/adm', AdmControllers.post)


//Rotas de adm login
router.get('/login/:id?', LoginControllers.get)
//router.post('/login', LoginControllers.post)
router.post('/login/auth', LoginControllers.login)

module.exports = router