
const router = require('express').Router()
const ProductsControllers = require('../controllers/products')
const ClientControllers = require('../controllers/client')
const PedidosControllers = require('../controllers/pedidos')

router.get('/products/:id?',  ProductsControllers.get)
router.post('/products', ProductsControllers.post)
router.put('/products/:id', ProductsControllers.put)
router.delete('/products/:id', ProductsControllers.remove)

router.get('/client/:id?', ClientControllers.get)
router.post('/client', ClientControllers.post)
router.put('/client/:id', ClientControllers.put)
router.delete('/client/:id', ClientControllers.remove)


router.get('/pedidos/:id?', ClientControllers.get)

module.exports = router