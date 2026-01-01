// //middlewares
// const express = require("express")
// const app=express();


// function agecheck(age){
//     if(age>=14){
//         return true;
//     }
//     else{
//         return false;
//     }
// }
// app.get('/ride1',function(req,res){
//     if(agecheck(req.query.age)){
//          res.json({
//          msg:"you have successfully ride the RIDE 1 "
//     })
//     }
//     else{
//         res.status(411).json({
//             msg:"sorry you are not of valid age!!!"
//         })
//     }
   
// })

// app.get('/ride2',function(req,res){
//     if(agecheck(req.query.age)){
//          res.json({
//          msg:"you have successfully ride the RIDE 2 "
//     })
//     }
//     else{
//         res.status(411).json({
//             msg:"sorry you are not of valid age!!!"
//         })
//     }
   
// })
// app.listen(3000);


//how we do with the middle ware
const express = require("express")
const app=express();


function agecheckmiddleware(req,res,next){
    const age=req.query.age;
    if(age>=14){
        next();
    }
    else{
         res.json({
            msg:"sorry you are not of valid age!!!"
        })
    }
}

app.use(agecheckmiddleware);   //using the middleware once for all app

app.get('/ride1',/*agecheckmiddleware*/function(req,res){
         res.json({
         msg:"you have successfully ride the RIDE 1 "
    })
   
})

app.get('/ride2',/*agecheckmiddleware*/function(req,res){
         res.json({
         msg:"you have successfully ride the RIDE 2 "
    })
})
app.listen(3000);

//we use next to propagage to next middle ware or to do something the last route is not use next in function
//inside the function so its look like 
//function(req,res,next())

//and the final route will do its the final work with suppose to do.

//how to use midle ware is similar to the functions and to use middlewares we just
//use them in the series in the routes
//using them always in app.get or post or somthing similar we just use the new ways like
//app.use(agecheckmiddleware) buit REMEBER ALWAYS USE AT THE TOP MOST OF ALL THE 
// ROUTES ELSE NOT WORK USELESSSSSSS.
//DEFAULT ERROR 500 FOR EXPRESS 
//ERROR HANDLING MIDDLE WARE IS ALWAYS DEFINE AT LAST OF ALL THE ROUTES AND 
//IT TAKES 4 ARGUMENTS ERR REQ RES NEXT  IT WILL HELP YOU TO THROW YOUR OWN ERROR NOT DEFAULT 500 STATUS CODE 