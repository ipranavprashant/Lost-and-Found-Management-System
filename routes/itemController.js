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

const createItem = async (req, res) => {
    try {
        // get the send-in data off request body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // create an item with id
        const createdItem = await Item.create({
            itemname: itemname,
            itemdescription: itemdescription,
            concerntype: concerntype
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
        const deprecatedItem = await Item.findByIdAndUpdate(itemId, {
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
        await Item.deleteOne({ _id: itemId })

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
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
}
