const express = require('express');
const {ProductModel} = require("../models/products.model")

const productRouter = express.Router()


//all products
productRouter.get('/', async (req, res) => {
    const products = await ProductModel.find()
    res.status(200).send(products)
})

//any perticuler product using id
productRouter.get('/product/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    res.status(200).send(product)
})

//pagination

productRouter.get('/page/:page', async (req, res) => {
    try {
        const products = await ProductModel.find().skip((req.params.page - 1) * 16).limit(16)
        res.status(200).send(products);
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});

//gender products
productRouter.get('/gender/:CAT', async (req, res) => {
    try {
        const products = await ProductModel.find({productGender:req.params.CAT}).limit(32)
        res.status(200).send(products);
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});


productRouter.get('/category', async(req, res) => {
    try {
        const category = req.query.c
        const products = await ProductModel.find({productCategory:category}).limit(32)
        res.status(200).send(products);
        console.log(products.length)
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});

productRouter.get('/name', async(req, res) => {
    try {
        const name = req.query.n
        console.log(name)
        const products = await ProductModel.find({productName:name});
        res.status(200).send(products);
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});

productRouter.get('/color', async(req, res) => {
    try {
        const color = req.query.c
        console.log(color)
        const products = await ProductModel.find({productColor:color}).limit(32)
        res.status(200).send(products);
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});


productRouter.get('/price', async(req, res) => {
    try {
        const min = req.query.min
        const max = req.query.max
        
        const products = await ProductModel.find({productPrice: {$gte:min, $lte:max}}).limit(32)
        res.status(200).send(products);
    } catch (error) {
        console.log("error");
        res.status(500).send({ message: error.message });
    }
});


productRouter.post('/add', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        console.log(product)
        res.status(201).send({massage:"Product added successfully",p:product.productName})
    } catch (error) {
        res.status(500).send({massage:error.message})
    }
})

module.exports = {
    productRouter
}