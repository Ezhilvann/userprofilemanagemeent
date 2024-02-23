const mongoose = require("mongoose")
 const user = mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
 })
 const User_Schema = mongoose.model("users",user);
 module.exports = User_Schema;