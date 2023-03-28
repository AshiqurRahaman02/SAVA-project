const express = require('express');
require("dotenv").config();
const cors = require('cors');
let {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {productRouter} = require("./routes/products.routes")

const app = express();

app.use(express.json());
app.use(cors())

app.get("/welcome",(req,res)=>{
    res.send("Welcome to our API")
})
app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to Database")
    }
    console.log(`Server is running on port ${process.env.port}`);
})