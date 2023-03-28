const express = require('express');
const {ProductModel} = require("../models/products.model")

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await ProductModel.find()
    res.status(200).send(products)
})

productRouter.get('/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    res.status(200).send(product)
})
productRouter.get('/?productGender', async (req, res) => {
    try {
        const product = await ProductModel.find({productGender:req.query.productGender})
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send({massage:error.message})
    }
})


productRouter.post('/add', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        res.status(201).send({massage:"Product added successfully",p:product.productName})
    } catch (error) {
        res.status(500).send({massage:error.message})
    }
})

module.exports = {
    productRouter
}