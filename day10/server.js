// //create 4 http server for multiply divide sum and add
// //we will further make this better route , data base and middle ware.

// const express=require("express")
// const app=express()

// app.get('/sum/:x/:y',function(req,res){  //using add/:a/:b will create dynamit paths for querys
//     let x=parseInt(req.params.x);  //herre also req.params.a
//     let y=parseInt(req.params.y);
//     res.send(x+y);
// })

// app.get('/multiply',function(req,res){
//         let x=parseInt(req.query.a);
//     let y=parseInt(req.query.b);
//     res.send(x*y);
// })

// app.get('/subtract',function(req,res){
//         let x=parseInt(req.query.a);
//     let y=parseInt(req.query.b);
//     res.send(x-y);
// })

// app.get('/divide',function(req,res){
//      let x=parseInt(req.query.a);
//     let y=parseInt(req.query.b);
//     res.send(x/y);
// })

// app.listen(3000);

const express=require("express")
const app=express()
let requestCount=0;

 function takingInput(req,res,next){
 requestCount+=1;
 console.log(requestCount);
    next();
}

app.get('/admin',function(req,res){
    res.send(requestCount);
})

app.use(takingInput);


app.get('/sum',function(req,res){  //using add/:a/:b will create dynamit paths for querys
    let x=parseInt(req.query.a);  //herre also req.params.a
    let y=parseInt(req.query.b);
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




//BEST WAY TO UNDERSTAND THE MIDDLE WARE


// const express=require("express")
// const app=express()
// let requestCount=0;

//  function takingInput(req,res,next){
//  requestCount+=1;
//  console.log(requestCount);
//     next();
// }

// function simulaterealfunction(req,res){
//     let x=parseInt(req.query.a);
//     let y=parseInt(req.query.b);
//     res.send(x+y);
// }
// app.get('/sum',takingInput,simulaterealfunction)

// app.listen(3000);

//generally in post request when we want to send the json data in the body then we have to use express.json() or body-parser  which is in 
//built in js .

// const express=require("express")
// const app=express();
// app.use(express.json());
// app.post('/adit',function(req,res){
//     const a =parseInt(req.body.a);
//     const b=parseInt(req.body.b);
//     res.send(a+b)

// })

// app.listen(3000);

//cors cross origin resource sharing
//how backend and frontend talk or frontend how it take the data from the backend?
//by default node.js and express and other blocked the cors because not blocked then server can send to any api website in user behalf which is valnarable.
