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

const fetchUserSpecificItems = async (req, res) => {
    try {
        console.log(req.user);
        // const userId = req.user._id;
        const userId = req.params.id;
        // find the items for the specified user ID
        const items = await Item.find({ user: userId });

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

const createItem = async (req, res) => {
    const { images } = req.body;
    try {
        // Extract data from the request body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // Get the user ID from the authenticated user (assuming you have authentication middleware)
        const userId = req.params.id; // Adjust this based on your authentication setup

        // Create the item with the associated user
        const item = await Item.create({
            itemname: itemname,
            itemdescription: itemdescription,
            concerntype: concerntype,
            images: images,
            user: userId, // Include the user ID in the item
        });

        // Respond with the created item
        res.json({ item: item });
    } catch (error) {
        // Handle errors here
        console.error("Error during createItem:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateItem = async (req, res) => {
    try {
        // get the id off the url
        const itemId = req.params.id;

        // get the data off the req body
        const itemname = req.body.itemname;
        const itemdescription = req.body.itemdescription;
        const concerntype = req.body.concerntype;

        // find and update the record
        const deprecatedItem = await Item.findOne({ _id: itemId }, {
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
    fetchUserSpecificItems: fetchUserSpecificItems,
    fetchItems: fetchItems,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
}
