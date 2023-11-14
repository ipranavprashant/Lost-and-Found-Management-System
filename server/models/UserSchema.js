const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"The entered Email ID is already registered"]
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    item:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"PersonalItem"
        }
    ]
});

module.exports=new mongoose.model("User",UserSchema);
