// const express=require("express");
// const jwt=require("jsonwebtoken");
// const JWT_SECRET="ilovejsonwebtoken"
// const {UserModel,TodoModel}=require('./db');
// const mongoose  = require("mongoose");
// const app=express();

// mongoose.connect("mongodb+srv://dtyson830_db_user:harkiratcohort@cohort.y6hh1e3.mongodb.net/adityajha7-todo");
// app.use(express.json());


// function authenticated(req,res,next){
//     const token=req.headers.token;
//     const decodedInfo=jwt.verify(token,JWT_SECRET);
//     if(decodedInfo){
//         req.userId=decodedInfo.id;
//             next();
//     }
//     else{
//         res.status(403).json({
//             message:"incorrect credentials"
//         })
//     }

// }

// app.post("/signup",async function(req,res){

//     const email=req.body.email;
//     const password=req.body.password;
//     const name=req.body.name;
//     await UserModel.create({  //since this request can fail and we are sending this to the db so we use promise async logic 
//         email:email,
//         password:password,
//         name:name
//     })
//     res.json({
//         message:"You are signed up!!"
//     })
// })

// app.post("/signin",async function(req,res){
//     const email=req.body.email;
//     const password=req.body.password;
//     const user=await UserModel.findOne({
//         email:email,
//         password:password
//     })
//     console.log(user);
//     if(user){
//         const token=jwt.sign({
//             id:user._id.toString()  //or not use also 
//         },JWT_SECRET);
//         res.json({
//             token:token
//         })
//     }
//     else{
//         res.status(403).json({
//             message:"incorrect credentials"
//         })
//     }
// });

// app.post("/todo", authenticated, async function (req, res) {
//     const title = req.body.title;

//     await TodoModel.create({
//         title: title,
//         done: false,
//         userId: req.userId
//     });

//     res.json({
//         message: "Todo created"
//     });
// });


// app.get("/todos", authenticated, async function (req, res) {
//     const todos = await TodoModel.find({
//         userId: req.userId
//     });
//     res.json({
//         todos: todos
//     });
// });


// app.listen(3000);


//jwt use 
//jwt secret use in signin
//mongoose.connect("")//also add when you connect to the db
//use findOne in signin email and password
//if user exist then create the token using jwt.sign sign what id user._id not username
//create middle ware for the auth check the token is correct? how hint token header se mango and then verify
//id to be change in the tostring(). 


//BCRYPT USE
//it has a funcytion called genSalt to generate the salt
const bcrypt=require("bcrypt");
const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="ilovejsonwebtoken"
const {UserModel,TodoModel}=require('./db');
const mongoose  = require("mongoose");
const {z}=require("zod")
const app=express();

mongoose.connect("mongodb+srv://dtyson830_db_user:harkiratcohort@cohort.y6hh1e3.mongodb.net/adityajha7-todo");
app.use(express.json());


function authenticated(req,res,next){
    const token=req.headers.token;
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    if(decodedInfo){
        req.userId=decodedInfo.id;
            next();
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }

}

app.post("/signup", async function (req, res) {
    const requiredBody=z.object({
        email:z.string().min(3).max(100),
        name:z.string(),
        password:z.string()
    }) //make the schema

    //parsing the data 
    //const parsedData=requiredBody.parse(req.body);
    const parsedDataWithSuccess=requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.json({
            message:"incorrect format",
            error:parsedDataWithSuccess.error//to log the error what are the things missing good inbuit in zod
        })
        return
    }

    //req.body
    //{
    //"email":"qwerty@gmail.com",
   // "password": "838eyudgwked",
    //"name": "tyson"
//}
//input validation look like this nothing different  so describe this Schema in zod object 
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);

        await UserModel.create({
            email,
            password: hashedPassword,
            name
        });

        return res.json({
            message: "You are signed up!!"
        });

    } catch (e) {
        return res.status(400).json({
            message: "User already exists or something went wrong"
        });
    }
});


app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await UserModel.findOne({
        email:email
    })
    if(!user){
        res.status(403).json({
            message:"User does not exists"
        });
        return;
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    console.log(user);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()  //or not use also 
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
});

app.post("/todo", authenticated, async function (req, res) {
    const title = req.body.title;

    await TodoModel.create({
        title: title,
        done: false,
        userId: req.userId
    });

    res.json({
        message: "Todo created"
    });
});


app.get("/todos", authenticated, async function (req, res) {
    const todos = await TodoModel.find({
        userId: req.userId
    });
    res.json({
        todos: todos
    });
});


app.listen(3000);

// //technique 1
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// //technique 2
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

//bcrypt to compare the password you enter and the data base

//use try catch to avoid errors

//zod

//what we except the user to send the string string string in the db we mentioned 
//but we cant trust and put all type of data 
// so we use zod for input validation
//the dumb way to solve it is the if else
    //like    if(typrof email !="string" or constains="@" and all those stuff)

//zod is the lib which do all the runtime validation

