const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    itemname:{
        type:String,
        required:true,
        minlength:3
    },
    itemdescription:{
        type:String,
        required:true,
        minlength:3
    },
    concerntype:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=new mongoose.model("Item",ItemSchema);
