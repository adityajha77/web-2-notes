const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User= new Schema({
    email:{type:String,unique:true},
    password:String,
    name:String
})

const Todo=new Schema({
    title:String,
    description:String,
    done:Boolean,
    userId:ObjectId
})

const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);

module.exports({
    UserModel:UserModel,//object and key value all things are module in node key :value //how other files will use or call it
//  first stand for name and second stands for the value or variable present in the file
    TodoModel:TodoModel
})
