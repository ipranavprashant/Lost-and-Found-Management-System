const mongoose = require("mongoose");

const HelperSchema = new mongoose.Schema({
    itemdetails: {
        type: String
    },
    helpername: {
        type: String,
        required: true,
        minlength: 3
    },
    mobilenumber: {
        type: String,
        required: true
    },
    hostelname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = new mongoose.model("Helper", HelperSchema);
