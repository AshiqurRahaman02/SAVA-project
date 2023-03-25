const express = require('express');
const {UserModel} = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const userRouter = express.Router();


//register route
userRouter.post("/register",async(req,res)=>{
    const {email,password,address,phone} = req.body

    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) throw err
            const user = new UserModel({email,password:hash,address,phone})
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
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err) throw err
            if(result){
                res.status(200).send({message:"Welcome Back to our website",token:jwt.sign({userId:user._id},"deathNote"),user})
            }
        })
    } catch (error) {
        res.status(404).send({message:error.message})
    }
})

module.exports ={
    userRouter
}