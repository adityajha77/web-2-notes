const express=require("express");
const z=require("zod");
const bcrypt=require("bcrypt")
const {connectdatabase,UserModel,BlogModel}=require("./db")
const app=express();
const jwt=require("jsonwebtoken")
require("dotenv").config();
app.use(express.json());
app.use(express.static(__dirname));


function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided"
        });
    }
    
    const token=authHeader.split(" ")[1];
    if(!token){
        res.status(403).json({
            message:"Invalid token"
        });
    }
    try{
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=verifyToken.id;
        next();
    }
    catch(error){
        return res.status(403).json({
            message:"invalid token"
        });
    }
    
}


const signupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(3),
  name: z.string(),
});

app.post("/signup",async function(req,res){

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;


     const checkIncomingData=signupSchema.safeParse(req.body);
     
     if(!checkIncomingData.success){
       
        return res.status(400).json({
            message:"please check the input field data"
        })
     }

    try{
    const hashedPassword=await bcrypt.hash(password,8);
    await UserModel.create({
        email:email,
        password:hashedPassword,
        name:name
     })
     res.json({
        message:"user successfully signed up!!!"
     })
     }catch(error){
        res.status(400).json({
            message:"User already exists or something went wrong"
        });
     }
    
})
connectdatabase();
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

app.post("/signin", async function (req, res) {
    const parsed = signinSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(403).json({
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(403).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET
    );

    res.json({ token });
});


app.post("/blogpost",auth,async function(req,res){
   const title=req.body.title;
   const content=req.body.content;
   try{
       const blog= await BlogModel.create({
    title:title,
    content:content,
    authorId:req.userId
   })
   res.json({
    message:"blog created succesfullly",
    blog
   });
}catch(error){
    res.status(403).json({
        message:"error creating the Blog"
    });
   }
});

app.listen(3000,console.log("server running on port 3000"));