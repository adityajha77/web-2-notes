const express=require('express')
const app=express();

let numberOfRequestsForUsers = {};
setInterval(() => {
    numberOfRequestsForUsers = {};
}, 5000)

function numberOfRequestsForUser(req,res,next){
    
const userId=req.headers["user-id"];

if(numberOfRequestsForUser[userId]){
    numberOfRequestsForUser[userId]+=1
    if(numberOfRequestsForUser[userId]>5){
        return res.status(404).send("rate limit exceeds")
    }
    else{
        next();
    }
}
    else{
            numberOfRequestsForUser[userId]=1;
                next();
    }
}

app.use(numberOfRequestsForUser);

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000);

module.exports = app;