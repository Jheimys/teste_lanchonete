
const router = require('express').Router()
const ProductsControllers = require('../controllers/products')

router.get('/products/:id?',  ProductsControllers.get)
router.post('/products', ProductsControllers.post)

module.exports = router