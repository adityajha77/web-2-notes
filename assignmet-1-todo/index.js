const express=require("express");
const fs=require("fs")

const app=express();

app.get('/',function(req,res){
    res.send('hello world today 1st 2026 and we make todo')
    console.log("server is running in the port 3000")
})

app.get('/todos',function(req,res){
    fs.readFile('todos.json',"utf-8",function(err,data){
        if(err){
            res.status(500).send("Error while reading the todo")//done mistake 2 also try to send the response code
            console.log(err);
        }
       res.send(data) //mistake done 1 send the response to the server else waithing the crash.
       console.log("data readed")
    })
})
app.listen(3000)