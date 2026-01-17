//database

const mongoose=require("mongoose")
const Schema=mongoose.Schema;//IMPORTING FROM MONGOOSE
const ObjectId=Schema.ObjectId;//IMPORTING FROM MONGOOSE

const User=new Schema({
    name:String,
    email:String,
    password:String
});

const Todo=new Schema({
    title:String,
    description:String,
    done:Boolean,
    userId:ObjectId
});

const UserModel=mongoose.model('users',User);//in which document you want to add we use model to insert in specific collection
const TodoModel=mongoose.model('todos',Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}//exporting the object whose key are UserModel and TodoModel
//exporting to other file to import and use these models and other things 

// define/install/add 
// schema
// where to add schema
// export so that other file can use
