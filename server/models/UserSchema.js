const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    rollno: {
        type: String,
        required: true,
        unique: [true, "This Roll No is already registered"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "The entered Email ID is already registered"]
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    // item: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Item"
    //     }
    // ]
});

module.exports = mongoose.model("User", UserSchema);
