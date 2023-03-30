const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    address:String,
    phoneNo:Number,
    alternatePhoneNo:Number
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}