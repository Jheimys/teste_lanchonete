
const router = require('express').Router()
const ProductsControllers = require('../controllers/products')

router.get('/products/:id?',  ProductsControllers.get)

module.exports = router