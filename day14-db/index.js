const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="ilovejsonwebtoken"
const {UserModel,TodoModel}=require('./db');
const mongoose  = require("mongoose");
const app=express();

mongoose.connect("mongodb+srv://dtyson830_db_user:harkiratcohort@cohort.y6hh1e3.mongodb.net/adityajha7-todo");
app.use(express.json());


function authenticated(req,res,next){
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
    await UserModel.create({  //since this request can fail and we are sending this to the db so we use promise async logic 
        email:email,
        password:password,
        name:name
    })
    res.json({
        message:"You are loged in!!"
    })
})

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
            id:user._id.toString()  //or not use also 
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
});

app.post("/todo", authenticated, async function (req, res) {
    const title = req.body.title;

    await TodoModel.create({
        title: title,
        done: false,
        userId: req.userId
    });

    res.json({
        message: "Todo created"
    });
});


app.get("/todos", authenticated, async function (req, res) {
    const todos = await TodoModel.find({
        userId: req.userId
    });
    res.json({
        todos: todos
    });
});


app.listen(3000);


//jwt use 
//jwt secret use in signin
//mongoose.connect("")//also add when you connect to the db
//use findOne in signin email and password
//if user exist then create the token using jwt.sign sign what id user._id not username
//create middle ware for the auth check the token is correct? how hint token header se mango and then verify
//id to be change in the tostring(). 