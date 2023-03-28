const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    address:String,
    phone:Number,
    alternatePhone:Number
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}