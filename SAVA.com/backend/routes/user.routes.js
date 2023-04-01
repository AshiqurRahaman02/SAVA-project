const express = require('express');
const {UserModel} = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const userRouter = express.Router();


//register route
userRouter.post("/register",async(req,res)=>{
    const {email,password,name,address,phoneNo,alternatePhoneNo} = req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) throw err
            const user = new UserModel({email,password:hash,name,address,phoneNo,alternatePhoneNo})
            console.log(user)
            await user.save()
            res.status(201).send({message:"User registered successfully"})
        })
    } catch (error) {
        res.status(404).send({message:error.message})
    }
})

//login route
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        let user =await UserModel.findOne({email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                res.status(200).send({message:"Welcome Back to our website",token:jwt.sign({userId:user._id},"deathNote"),user})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({message:error.message})
    }
})

//delete route
userRouter.delete("delete/:id",async(req,res)=>{
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"User deleted successfully"})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
})

module.exports ={
    userRouter
}