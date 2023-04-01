const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    productName:String,
    productDescription:String,
    productPrice:Number,
    productImage:{
        type:String,
        unique:true,
        required:true
    },
    productCategory:String,
    productGender:String,
    productColor:String,
    productYear:String
},{
    versionKey:false
})

const ProductModel = mongoose.model("product",productsSchema)

module.exports = {
    ProductModel
}