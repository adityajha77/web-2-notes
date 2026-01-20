const mongoose=require("mongoose");
require("dotenv").config();

//console.log(process.env.MONGO_URL);
const Schema=mongoose.Schema;


const User=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true}
});
const blogs=new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    authorId: {type: Schema.Types.ObjectId,ref: "users",required: true}
})

const UserModel=mongoose.model('users',User);
const BlogModel=mongoose.model('blogs',blogs);


async function connectdatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    }
    catch(error){
        console.error("database not connected",error);
        process.exit(1);
    }
}
//connectdatabase();

module.exports={
    connectdatabase,
    UserModel,
    BlogModel
}