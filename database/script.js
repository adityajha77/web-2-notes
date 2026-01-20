const express=require("express");
const jwt=require("jsonwebtoken")
const JWT_SECRET="ilovejsonwebtoken"
const app=express();
const mongoose=require("mongoose");
const {UserModel,TodoModel}=require("./db");


mongoose.connect("mongodb+srv://dtyson830_db_user:harkiratcohort@cohort.y6hh1e3.mongodb.net/adityajha7-todo")
app.use(express.json());

function auth(req,res,next){
    const token=req.headers.token;
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    if(decodedInfo){
        req.userId=decodedInfo.id;
        next();
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
}

app.post("/signup",async function(req,res){
 const email=req.body.email;
 const password=req.body.password;
 const name=req.body.name;
 await UserModel.create({
    email:email,
    password:password,
    name:name
 })
 res.json({
    message:"you are signed up!!"
 })
});

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user);
    if(user){
        const token=jwt.sign({
            id:user._id.toString
        },JWT_SECRET);
        res.json({
            token:token
        });
    }
    else{
        res.status(403).json({
            message:"invalid credentials!!!"
        })
    }
});

app.post("/todos",auth,async function(req,res){
    const todos=await TodoModel.find({
        userId:req.userId
    });
    res.json({
        todos:todos
    })
})

app.get("/todo",auth,async function(req,res){
    const title=req.body.title;
    await TodoModel.create({
        title:title,
        done:false,
        userId:req.userId
    })
    res.json({
        message:"Todo created success"
    })
});

app.listen(3000);



