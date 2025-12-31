// const fs =require("fs")

// fs.readFile("a.txt","utf-8",function(err,data){
//     if(err){
//         console.log("error reading the file");
//     }
//     if(data){
//         console.log(data);
//     }
// })

const express=require("express");
const app=express()

//route handler
app.get('/',function(req,res){
    res.send('hello world from express');
})

app.listen(3000) //port listen 
//go to post man and check for the http//localhost:3000/ and get you will see hello world


// assignments
// Create a command line interface that lets the user specify a file path 
// and the nodejs process counts the number of words inside it.
// cli todo
//Assignment - Trying to code a filesystem based todo app using expresss