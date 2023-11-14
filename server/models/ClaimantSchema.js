const mongoose = require("mongoose");

const ClaimantSchema = new mongoose.Schema({
    itemdetails: {
        type: String
    },
    claimantname: {
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
    proofofclaim: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = new mongoose.model("Claimant", ClaimantSchema);
