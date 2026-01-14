const express=require("express")
const app=express();
const jwt=require("jsonwebtoken")
const JWT_SECRET="ILOVEYOUJSONWEBTOKEN";

app.use(express.json());

const users=[];


app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const user=users.find(u=>u.username===username && u.password===password)
    if(!user){
        return res.json({
            message:"incorrect username or password"
        })
    }
    const token=jwt.sign({ //jwt takes two input
        username:username //what you want to sign
    },JWT_SECRET); //who is the signer
   //dont have to store the token in the data base 
   res.json({
    token:token
   })
})

app.post('/signup',(req,res)=>{
       const username=req.body.username;
    const password=req.body.password;

    if(username.length<3){
        res.json({
            message:"username is too small"
        })
        return;
    }
    if(password.length<3){
        res.json({
            message:"password is easy"
        })
        return;
    }
    if(users.find(u=>u.username===username)){
        res.json({
            message:"already exists"
        })
    }
        users.push({
            username:username,
            password:password
        })
        res.json({
            message:"you are signed in "
        })
})

app.get('/getusers',function(req,res){
    res.send(users);
})

app.get('/me',function(req,res){
    const token=req.headers.token; //sends the jwt 
    const decodedinformation=jwt.verify(token,JWT_SECRET); //have the username 
    const username=decodedinformation.username;
    const user=users.find(u=>u.username==username)
    if(user){
        res.send(username)
    }
    else{
        res.status(404).send("token invalid")
    }

})

app.listen(3000);



