//authentication jwt 

const express=require("express");
const app=express();

app.use(express.json());//middleware to parse the post body 

const users=[]; //store data in this array 


function signinhandler(){  //do in either of way just we have to pass the function that it
res.json("heyy there i am signin")
}

app.post("/signin",signinhandler);


app.post("signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })

    if(password.length<5){                          //checks
        res.json({
            msg:"please enter more than 5 char"
        })
        return;
    }
        if(username.length<4){              //checks
        res.json({
            msg:"please enter more than 3 char"
        })
        return;
    }

    if(users.find(u=>u.username===username)){ //checks
        res.json(
            {
                msg:"user already exists"
            }
        )
        return;
    }

    res.json({
        msg:"you have successfully sign in"
    })
})

app.listen(3000);  //http is listening in port 3000