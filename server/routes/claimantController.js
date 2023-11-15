const Claimant = require("../models/ClaimantSchema");

const fetchClaimants = async (req, res) => {
    try {
        const claimant = await Claimant.find();
        res.json({ gotClaimant: claimant });
    } catch (error) {
        console.error("Error during fetchClaimants:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchClaimant = async (req, res) => {
    try {
        const claimantId = req.params.id;
        const claimant = await Claimant.findById(claimantId);
        res.json({ gotClaimant: claimant });
    } catch (error) {
        console.error("Error during fetchClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createClaimant = async (req, res) => {
    try {
        // get the send-in data off request body
        const claimantname = req.body.claimantname;
        const mobilenumber = req.body.mobilenumber;
        const hostelname = req.body.hostelname;
        const proofofclaim = req.body.proofofclaim;
        const itemdetails = req.body.itemdetails;


        // create an claimant with id
        const createdClaimant = await Claimant.create({
            claimantname: claimantname,
            mobilenumber: mobilenumber,
            hostelname: hostelname,
            proofofclaim: proofofclaim,
            itemdetails: itemdetails
        });

        // respond with the new note
        res.json({ createdClaimant: createdClaimant });
    } catch (error) {
        // Handle errors here
        console.error("Error during createClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const updateClaimant = async (req, res) => {
    try {
        // get the id off the url
        const claimantId = req.params.id;

        // get the data off the req body
        const claimantname = req.body.claimantname;
        const mobilenumber = req.body.mobilenumber;
        const hostelname = req.body.hostelname;
        const proofofclaim = req.body.proofofclaim;
        const itemdetails = req.body.itemdetails;


        // find and update the record
        const deprecatedClaimant = await Claimant.findByIdAndUpdate(claimantId, {
            claimantname: claimantname,
            mobilenumber: mobilenumber,
            claimanthostelname: hostelname,
            proofofclaim: proofofclaim,
            itemdetails: itemdetails


        })

        const updatedClaimant = await Claimant.findById(claimantId);

        // respond with both the old and the updated claimant details
        res.json({
            deprecatedClaimant: deprecatedClaimant,
            updatedClaimant: updatedClaimant
        });
    } catch (error) {
        // Handle errors here
        console.error("Error during updateClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteClaimant = async (req, res) => {
    try {
        // get id off url
        const claimantId = req.params.id;

        // delete the record
        await Claimant.deleteOne({ _id: claimantId })

        // respond with the deleted claimant
        res.json({ success: "Claimant Deleted" });
    } catch (error) {
        // Handle errors here
        console.error("Error during deleteClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    fetchClaimant: fetchClaimant,
    fetchClaimants: fetchClaimants,
    createClaimant: createClaimant,
    updateClaimant: updateClaimant,
    deleteClaimant: deleteClaimant
}
