const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    productName:String,
    productDescription:String,
    productPrice:Number,
    productImage:String,
    productCategory:String,
    productGender:String,
    productColor:String
})

const ProductModel = mongoose.model("product",productsSchema)

module.exports = {
    ProductModel
}