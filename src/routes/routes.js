
const router = require('express').Router()
const ProductsControllers = require('../controllers/products')

router.get('/products',  ProductsControllers.get)

module.exports = router