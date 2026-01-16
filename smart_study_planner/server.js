const express=require("express");
const app=express();
const path = require('path');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let tasks=[];

app.post('/api/tasks',function(req,res){
    const text=req.body.text;
    const priority=req.body.priority;
    const id = Date.now();//any thing you can use the random math.floor(math.random()*1000);
    const newTask={
        id:id,
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

app.delete('/api/tasks/:id',function(req,res){
    const idtoDelete=parseInt(req.params.id);
    const initialLength=tasks.length;
    tasks=tasks.filter(u=>u.id!==idtoDelete);
    if(tasks.length===initialLength){
        return res.status(404).json({
            success:false,
            message:"task not found"
        })
    }
    console.log("remaining tasks ",tasks);
    res.json({
        success:true,
        message:"deleted"
    })
})

app.listen(3000);