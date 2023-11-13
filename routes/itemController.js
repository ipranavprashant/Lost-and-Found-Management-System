const Item = require("../models/ItemSchema");

const fetchItems = async (req, res) => {
    try {
        // find the notes
        const item = await Item.find();

        // respond with them
        res.json({ gotItem: item });
    } catch (error) {
        // Handle errors here
        console.error("Error during fetchItems:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchItemsPersonal = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

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


const fetchItem = async (req, res) => {
    try {
        // get id off the url
        const itemId = req.params.id;

        // find the notes using that id
        const item = await Item.findById(itemId);

        // respond with them
        res.json({ gotItem: item });
    } catch (error) {
        // Handle errors here
        console.error("Error during fetchItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchItemPersonal = async (req, res) => {
    try {
        // get id off the url
        const itemId = req.params.id;

        // find the notes using that id
        const item = await Item.findOne({_id:itemId,user:req.user._id});

        // respond with them
        res.json({ gotItem: item });
    } catch (error) {
        // Handle errors here
        console.error("Error during fetchItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createItem = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // get the send-in data off request body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // create an item with id
        const createdItem = await Item.create({
            itemname: itemname,
            itemdescription: itemdescription,
            concerntype: concerntype,
            user: req.user._id
        });

        // respond with the new note
        res.json({ createdItem: createdItem });
    } catch (error) {
        // Handle errors here
        console.error("Error during createItem:", error);
        res.status(500).send("Internal Server Error");
    }
}


const updateItem = async (req, res) => {
    try {
        // get the id off the url
        const itemId = req.params.id;

        // get the data off the req body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // find and update the record
        const deprecatedItem = await Item.findOne({_id:itemId,user:req.user._id}, {
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

const deleteItem = async (req, res) => {
    try {
        // get id off url
        const itemId = req.params.id;

        // delete the record
        await Item.deleteOne({ _id: itemId, user:req.user._id })

        // respond with the deleted item
        res.json({ success: "Item Deleted" });
    } catch (error) {
        // Handle errors here
        console.error("Error during deleteItem:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    fetchItem: fetchItem,
    fetchItems: fetchItems,
    fetchItemsPersonal:fetchItemsPersonal,
    fetchItemPersonal:fetchItemPersonal,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
}
