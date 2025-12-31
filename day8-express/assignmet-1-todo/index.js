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

app.post('/todos',function(req,res){
    let body="";
    req.on('data',function(chunk){
        body+=chunk.toString();
    })
    req.on('end',function(){ //only runs one when last packet arrives.
        const newTodo=JSON.parse(body);
        newTodo.id = Math.floor(Math.random() * 1000000); // assigns a random number to tell the id
        fs.readFile('todos.json','utf-8',function(err,data){
            if(err){
                console.log(err);
            }
            else{
                const todos=JSON.parse(data);
                todos.push(newTodo);
                fs.writeFile('todos.json',JSON.stringify(todos),(err)=>{
                    if(err){
                        res.status(500).send("error writting the file",err);
                    }
                    else{
                        res.status(201).send("todo added successfully");
                    }
                });
            }
        })
    })
})

app.delete('/todos/:id',(req,res)=>{
   fs.readFile('todos.json','utf-8',function(err,data){
    if(err){
        console.log(err)
    }
    let todos=JSON.parse(data);
    const id=parseInt(req.params.id);
    const newTodos=todos.filter(item =>item.id !== id);
    if(newTodos.length===todos.length){
        return res.status(404).send("id not found")
    }
    fs.writeFile('todos.json',JSON.stringify(newTodos),(err)=>{
                    if(err){
                        res.status(500).send("error writting the file",err);
                    }
                    else{
                        res.status(201).send("todo deleted successfully");
                    }
                });
   })
})

app.put('/todos/:id',function(req,res){
    const id=parseInt(req.params.id);
   
    let body="";
    req.on('data',function(chunk){
        body+=chunk.toString();
    })
    req.on('end',function(){ //only runs one when last packet arrives.
        const todoUpdates=JSON.parse(body); 
        fs.readFile('todos.json','utf-8',function(err,data){
            if(err){
                console.log(err);
                return;
            }
            let todos=JSON.parse(data);
            let found=false;
                for(let i=0;i<todos.length;i++){
                    if(todos[i].id===id){
                        todos[i].title=todoUpdates.title;
                        todos[i].completed=todoUpdates.completed;
                        found=true;
                    }
                }
                if(!found){
                    return res.status(404).send("todo not found");
                }
                    fs.writeFile('todos.json',JSON.stringify(todos),(err)=>{
                    if(err){
                        res.status(500).send("error writting the file",err);
                    }
                    else{
                        res.status(201).send("todo updated  successfully");
                    }
                });
            }
        )}
    )
})



app.listen(3000)
//KEY TAKEAWAYS ---->
//const newTodo = JSON.parse(body);
//What it does: It takes a string of data (called body) that is formatted as JSON and converts it into a usable JavaScript Object.


//const id = parseInt(req.params.id);
//What it does: It looks at the URL parameters to find an id, converts it from a string to a number (Integer), and stores it.


//When you send data to a server, it doesn't arrive all at once. It arrives in small "chunks"
//  (packets), like water dripping from a tap

//You cannot add an Object to a String. You need to turn the file data into an array first.

//writting repeated code study middle ware and come and solve these repeating line of codees 

//some more assignments are 
//

