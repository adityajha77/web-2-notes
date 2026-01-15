const express=require("express");
const app=express();
const path = require('path');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let tasks=[];

app.post('/api/tasks',function(req,res){
    const text=req.body.text;
    const priority=req.body.priority;
    const newTask={
        text:text,
        priority:priority
    };
    tasks.push(newTask);
    console.log(newTask);
    res.json(newTask);
})

app.get('/api/tasks',function(req,res){
    res.json(tasks);
})

app.listen(3000);