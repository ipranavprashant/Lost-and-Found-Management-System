const Helper = require("../models/HelperSchema");

const fetchHelpers = async (req, res) => {
    try {
        const helper = await Helper.find();
        res.json({ gotHelper: helper });
    } catch (error) {
        console.error("Error during fetchHelpers:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchHelper = async (req, res) => {
    try {
        const helperId = req.params.id;
        const helper = await Helper.findById(helperId);
        res.json({ gotHelper: helper });
    } catch (error) {
        console.error("Error during fetchHelper:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createHelper = async (req, res) => {
    try {
        // get the send-in data off request body
        const helpername = req.body.helpername;
        const mobilenumber = req.body.mobilenumber;
        const hostelname = req.body.hostelname;
        const itemdetails = req.body.itemdetails;

        // create an helper with id
        const createdHelper = await Helper.create({
            helpername: helpername,
            mobilenumber: mobilenumber,
            hostelname: hostelname,
            itemdetails: itemdetails
        });

        // respond with the new note
        res.json({ createdHelper: createdHelper });
    } catch (error) {
        // Handle errors here
        console.error("Error during createHelper:", error);
        res.status(500).send("Internal Server Error");
    }
}

const updateHelper = async (req, res) => {
    try {
        // get the id off the url
        const helperId = req.params.id;

        // get the data off the req body
        const helpername = req.body.helpername;
        const mobilenumber = req.body.mobilenumber;
        const hostelname = req.body.hostelname;
        const itemdetails = req.body.itemdetails;

        // find and update the record
        const deprecatedHelper = await Helper.findByIdAndUpdate(helperId, {
            helpername: helpername,
            mobilenumber: mobilenumber,
            helperhostelname: hostelname,
            itemdetails: itemdetails

        })

        const updatedHelper = await Helper.findById(helperId);

        // respond with both the old and the updated helper details
        res.json({
            deprecatedHelper: deprecatedHelper,
            updatedHelper: updatedHelper
        });
    } catch (error) {
        // Handle errors here
        console.error("Error during updateHelper:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteHelper = async (req, res) => {
    try {
        // get id off url
        const helperId = req.params.id;

        // delete the record
        await Helper.deleteOne({ _id: helperId })

        // respond with the deleted helper
        res.json({ success: "Helper Deleted" });
    } catch (error) {
        // Handle errors here
        console.error("Error during deleteHelper:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    fetchHelper: fetchHelper,
    fetchHelpers: fetchHelpers,
    createHelper: createHelper,
    updateHelper: updateHelper,
    deleteHelper: deleteHelper
}
