const express=require("express");
const z=require("zod");
const bcrypt=require("bcrypt")
const {connectdatabase,UserModel,BlogModel}=require("./db")
const app=express();
app.use(express.json());
app.use(express.static(__dirname));


const signupSchema = z.object({
    email:z.string(),
    password:z.string().min(3),
  name: z.string(),
});

app.post("/signup",async function(req,res){

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;


     const checkIncomingData=signupSchema.safeParse(req.body);
     
     if(!checkIncomingData.success){
       
        res.status(400).json({
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


app.listen(3000,console.log("server running on port 3000"));