//cors cross origin resource sharing
//how backend and frontend talk or frontend how it take the data from the backend?
//by default node.js and express and other blocked the cors because not blocked then server can send to any api website in user behalf which is valnarable.

const express=require('express');
const cors =require('cors');
const app=express();


app.use(express.json())
app.use(cors())  //{
    domian://we can restrict also domain   }

app.post('/sum',function(req,res){
    const a= parseInt(req.body.a);
    const b= parseInt(req.body.b);
    res.json({ sum: a + b });
})
app.listen(3000);