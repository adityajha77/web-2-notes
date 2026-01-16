const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="ILOVEJSONWEBTOKEN";
const app=express();
const path = require('path');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let tasks=[];

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];//authheader is tru yes no like if else after and means split from whereever is the space
    //and go to [1] position and extract it that is the token since the bearer token looks like this "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        
        req.user = user; 
        next();
    });

}

app.post("/api/login",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
        if(username.length<4){
        return res.json({
            success:false,
            message:"please enter the username more than 3 char" 
        })
    }
         if(password.length<6){
        return res.json({
            success:false,
            message:"please enter the password more than 6 char" 
        })
    }
    if(username==="admin"&& password==="pass123"  || username==="aditya"&& password==="qwerty123"){
        const token=jwt.sign({
            username:username
        },JWT_SECRET,{expiresIn:"1h"})
        res.json({
            success:true,
            token:token
        });
    }else{
        res.status(401).json({
            message:"invalid credentials",
            success:false,
        })
    }
})

app.post('/api/tasks',authenticateToken,function(req,res){
    const text=req.body.text;
    const priority=req.body.priority;
    const id = Date.now();//any thing you can use the random math.floor(math.random()*1000);
    const newTask={
        id:id,
        text:text,
        priority:priority,
        owner: req.user.username 
    };
    tasks.push(newTask);
    console.log(newTask);
    res.json(newTask);
})

app.get('/api/tasks', authenticateToken, function(req, res) {
    const userTasks = tasks.filter(task => task.owner === req.user.username);
    res.json(userTasks);
});

app.delete('/api/tasks/:id', authenticateToken, function(req, res) {
    const idToDelete = parseInt(req.params.id);

    const initialLength = tasks.length;
    tasks = tasks.filter(
        task => task.id !== idToDelete || task.owner !== req.user.username
    );
    if (tasks.length === initialLength) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Deleted" });
});


app.listen(3000);
