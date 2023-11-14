const Item = require("../models/PersonalItem");

const fetchItemsPersonal = async (req, res) => {
    try {
        // find the items for the authenticated user
        const items = await Item.find({ user: req.user._id });

        // respond with them
        res.json({ gotItems: items });
    } catch (error) {
        // Handle errors here
        console.error("Error during fetchItemsPersonal:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchItemPersonal = async (req, res) => {
    try {
        // get id off the url
        const itemId = req.params.id;

        // find the notes using that id
        const item = await Item.findOne({ _id: itemId, user: req.user._id });

        // respond with them
        res.json({ gotItem: item });
    } catch (error) {
        // Handle errors here
        console.error("Error during fetchItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createItemPersonal = async (req, res) => {
    const itemname = req.body.itemname;
    const itemdescription = req.body.itemdescription;
    const concerntype = req.body.concerntype;

    const item = await Item.create({
        itemname: itemname,
        itemdescription: itemdescription,
        concerntype: concerntype,
        user: req.user._id
    })
    res.json({ item: item });
}

const updateItemPersonal = async (req, res) => {
    try {
        // get the id off the url
        const itemId = req.params.id;

        // get the data off the req body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // find and update the record
        const deprecatedItem = await Item.findOneAndUpdate({ _id: itemId, user: req.user._id }, {
            itemname: itemname,
            itemdescription: itemdescription,
            itemconcerntype: concerntype
        })

        const updatedItem = await Item.findById(itemId);

        // respond with both the old and the updated item details
        res.json({
            deprecatedItem: deprecatedItem,
            updatedItem: updatedItem
        });
    } catch (error) {
        // Handle errors here
        console.error("Error during updateItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteItemPersonal = async (req, res) => {
    try {
        // get id off url
        const itemId = req.params.id;

        // delete the record
        await Item.deleteOne({ _id: itemId, user: req.user._id })

        // respond with the deleted item
        res.json({ success: "Item Deleted" });
    } catch (error) {
        // Handle errors here
        console.error("Error during deleteItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    fetchItemsPersonal: fetchItemsPersonal,
    fetchItemPersonal: fetchItemPersonal,
    createItemPersonal: createItemPersonal,
    updateItemPersonal: updateItemPersonal,
    deleteItemPersonal: deleteItemPersonal
}
