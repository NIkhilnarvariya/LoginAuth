const express=require("express")
const mongoose =require("mongoose")
const cors=require("cors")
const EmployeeModel=require('./model/Employee')
const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/employewe")

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("SUCESSSS")
            }else{
                res.json("INCOREECT PASSWORD")
            }}else{
                res.json("NOT EXIST")
            
        }
    })
})
app.post('/register',(req,res)=>{
     EmployeeModel.create(req.body)
     .then(employee=>res.json(employee))
     .catch(err=>res.json(err))
})
app.listen(3001,()=>{
    console.log("SERVICE UP")
})