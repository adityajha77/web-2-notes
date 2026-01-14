// //authentication jwt 

// // const express=require("express");
// // const app=express();

// // app.use(express.json());//middleware to parse the post body 

// // const users=[]; //store data in this array

// // function createToken(){
// //     //anthing of your own topic/logic.
// //     let options=[
// //   'a','b','c','d','e','f','g','h','i','j','k','l','m',
// //   'n','o','p','q','r','s','t','u','v','w','x','y','z',
// //   'A','B','C','D','E','F','G','H','I','J','K','L','M',
// //   'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
// //   '1','2','3','4','5','6','7','8','9'
// // ]
// // let token="";
// // for(let i=0;i<32;i++){
// //     token+=options[Math.floor(Math.random()*options.length)];
// // }
// //     return token;
// // }


// // function signinhandler(req, res) {
// //     const username = req.body.username;
// //     const password = req.body.password;

// //     const user = users.find(u => u.username === username && u.password === password);

// //     if (!user) {
// //         return res.status(401).json({
// //             msg: "Invalid username or password"
// //         });
// //     }

// //     const token = createToken();
// //     user.token = token;

// //     res.json({
// //         token: token
// //     });
// // }


// // app.post("/signin",signinhandler);


// // app.post("/signup",function(req,res){
// //     const username=req.body.username;
// //     const password=req.body.password;

// //     if(password.length<5){                          //checks
// //         res.json({
// //             msg:"please enter more than 5 char"
// //         })
// //         return;
// //     }
// //         if(username.length<4){              //checks
// //         res.json({
// //             msg:"please enter more than 3 char"
// //         })
// //         return;
// //     }

// //     if(users.find(u=>u.username===username)){ //checks
// //         res.json(
// //             {
// //                 msg:"user already exists"
// //             }
// //         )
// //         return;
// //     }

// //         users.push({
// //         username:username,
// //         password:password
// //     })

// //     res.json({
// //         msg:"you have successfully sign in"
// //     })
// // })

// // app.get("/getusers",(req,res)=>{
// //     res.send(users);
// // })

// // app.get("/me",function(req,res){
// //     const token=req.headers.authorization;
// //     const user=users.find(user=>user.token===token)//go to every user and check for the required token short opperator to you can use for looop also
// //     if(user){
// //         res.send(user.username)
// //     }
// //     else{
// //         res.status(401).send("user unauthorized")
// //     }
// // })



// // app.listen(3000);  //http is listening in port 3000

// //now we have to add who is the owner of the account with the hellp of the token

// //statefull is a problem always fetching the databasee hitting tooo much 
// //use JWT TOKENS these are token which store nessesaery data to authenticate
// //jwt are stateless and help not to hit db always to authenticate.
// //frontend  se signup req aya to back end and back end data tbase ko bheja
// //fe se signin req aya backend pe be db ko bheja req and be fe ko jwt bheja token ki lo tum apne pass rakho ab javb bhi tum meko bheje ga hum samjh jainge
// //ab jab bhi /me ya koi bhi end point access karega to actually har baar db mae hit nai karega abs jwt dekhega verify and good to go
// //lets do the practical with the code by adding npm i jsonwebtoken
// // encrypt and decrypt logic basically encryptting the userid or similar thing which server decode the 

// const express=require("express");
// const app=express();
// const jwt=require("jsonwebtoken")
// const JWT_SECRET="iloveyou"

// app.use(express.json());//middleware to parse the post body 

// const users=[]; //store data in this array

// function signinhandler(req, res) {
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = users.find(u => u.username === username && u.password === password);

//     if (!user) {
//         return res.status(401).json({
//             msg: "Invalid username or password"
//         });
//     }

//     const token = jwt.sign({
//         username:username  //WHAT TYOU WHAT TO ENCRIPT OR ENCODE THIS TOKEN HERE USERNAME 
//     },JWT_SECRET);//convert useranme to the jwt using the jsonwebtoken and built in function
//     //user.token = token; STATELESS TOKEN SO DONT NEED TO STORE THE TOKEN

//     res.json({
//         token: token
//     });
// }


// app.post("/signin",signinhandler);


// app.post("/signup",function(req,res){
//     const username=req.body.username;
//     const password=req.body.password;

//     if(password.length<5){                          //checks
//         res.json({
//             msg:"please enter more than 5 char"
//         })
//         return;
//     }
//         if(username.length<4){              //checks
//         res.json({
//             msg:"please enter more than 3 char"
//         })
//         return;
//     }

//     if(users.find(u=>u.username===username)){ //checks
//         res.json(
//             {
//                 msg:"user already exists"
//             }
//         )
//         return;
//     }

//         users.push({
//         username:username,
//         password:password
//     })

//     res.json({
//         msg:"you have successfully sign in"
//     })
// })

// app.get("/getusers",(req,res)=>{
//     res.send(users);
// })

// app.get("/me",function(req,res){
//     const token=req.headers.authorization;
//     const decodedinfo=jwt.verify(token,JWT_SECRET);//get the data or value in this veriable
//     const user=users.find(user=>user.username===decodedinfo.username)//go to every user and check for the required token short opperator to you can use for looop also

//     if(user){
//         res.send(decodedinfo.username)
//     }
//     else{
//         res.status(401).send("user unauthorized")
//     }
// })



// app.listen(3000);

//❌ Don’t ask: “Which user has this token?”
//✅ Ask: “What user info is inside this token?”
//we can also use the to stor ethe env file.
//const JWT_SECRET = process.env.JWT_SECRET;
//there are multiple things to doo with like .verfy .decode and etc
//cookie browseer mae rehta hai aur jab bhi browser bolega ki set-cookie then server store the cookie and wherever needed server aways send that cookie and cookie 
//send via the headers

//headers mae wo sab dalo jo humesha bhej na hai server ko and body mae wo he dalo jo ek dho baar ya userya dega



//revision 
const express=require("express")
const app=express();
app.use(express.json());

const users=[];
// function generatetoken(){
//     const token=Math.floor(Math.random()*1000);
//     console.log(token);
// }
// generatetoken();

function generatetoken(){
    let token="";
    let options=[
   'a','b','c','d','e','f','g','h','i','j','k','l','m',
   'n','o','p','q','r','s','t','u','v','w','x','y','z',
   'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
   '1','2','3','4','5','6','7','8','9' ];
for(let i=0;i<32;i++){
    token+=options[Math.floor(Math.random()*options.length)]
}
return token;
}

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const user=users.find(u=>u.username===username && u.password===password)
    if(!user){
        return res.json({
            message:"incorrect username or password"
        })
    }
    const token=generatetoken();
    user.token=token
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
    const token=req.headers.token;
    const user=users.find(u=>u.token==token)
    if(user){
        res.send(user.username)
    }
    else{
        res.status(404).send("token invalid")
    }

})

app.listen(3000);





