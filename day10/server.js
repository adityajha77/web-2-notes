//create 4 http server for multiply divide sum and add

const express=require("express")
const app=express()

app.get('/sum/:x/:y',function(req,res){  //using add/:a/:b will create dynamit paths for querys
    let x=parseInt(req.params.x);  //herre also req.params.a
    let y=parseInt(req.params.y);
    res.send(x+y);
})

app.get('/multiply',function(req,res){
        let x=parseInt(req.query.a);
    let y=parseInt(req.query.b);
    res.send(x*y);
})

app.get('/subtract',function(req,res){
        let x=parseInt(req.query.a);
    let y=parseInt(req.query.b);
    res.send(x-y);
})

app.get('/divide',function(req,res){
     let x=parseInt(req.query.a);
    let y=parseInt(req.query.b);
    res.send(x/y);
})

app.listen(3000);