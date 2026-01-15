const express=require("express")
const app=express();
const jwt=require("jsonwebtoken")
const JWT_SECRET="ILOVEYOUJSONWEBTOKEN";

app.use(express.json());

const users=[];

function auth(req,res,next){
     const token=req.headers.token; //sends the jwt 
    const decodedinformation=jwt.verify(token,JWT_SECRET); //have the username we are verifying with the secret not decoding
    const username=decodedinformation.username;
    if(username){
        req.username=username;
        next();
    }
    else{
        res.send(404).send("you are  not logged in")
    }
}

function logger(req,res,next){
    console.log(req.method + "request came");
    next();
}

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post('/signin',logger,function(req,res){
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

app.post('/signup',logger,(req,res)=>{
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
        return res.json({
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

app.get('/getusers',logger,function(req,res){
    res.send(users);
})

app.get('/me',logger,auth,function(req,res){
    
    const user=users.find(u=>u.username==req.username)
    if(user){
        res.json({ username: user.username })

    }
    else{
        res.status(404).send("token invalid")
    }

})

app.listen(3000);


//PASSPORT LIBRARY JS
//COOKIES OAUTH LEARN THESE


