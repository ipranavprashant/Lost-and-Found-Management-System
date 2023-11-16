const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    // this is basically a foreign key which is getting its reference from the User.js model
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    user: {
        type:String,
        required:true
    },
    itemname: {
        type: String,
        required: true,
        minlength: 3
    },
    itemdescription: {
        type: String,
        required: true,
        minlength: 3
    },
    concerntype: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = new mongoose.model("Item", ItemSchema);
