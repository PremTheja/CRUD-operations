const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
})

const UserModel=mongoose.model("Users",userschema)

module.exports={
    UserModel,
}