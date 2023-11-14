// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToMongo = require('./config/connectToMongo');
const itemController = require('./routes/itemController');
const userController = require('./routes/userController');
const claimantController = require('./routes/claimantController');
const helperController = require('./routes/helperController');
const requireAuth = require('./middleware/requireAuth');
const personalItemController = require("./routes/personalItemController");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

// Connect to the database
connectToMongo();

// Routing
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/logout", userController.logout);
app.get("/check-auth", requireAuth,userController.checkAuth);

app.post("/item", itemController.createItem); 
app.get("/item", itemController.fetchItems);
app.get("/item/:id", itemController.fetchItem);
app.put("/item/:id",  itemController.updateItem); 
app.delete("/item/:id",  itemController.deleteItem); 

app.post("/claimant",  claimantController.createClaimant); 
app.get("/claimant", claimantController.fetchClaimants);
app.get("/claimant/:id", claimantController.fetchClaimant);
app.put("/claimant/:id",  claimantController.updateClaimant); 
app.delete("/claimant/:id",  claimantController.deleteClaimant); 

app.post("/helper",  helperController.createHelper); 
app.get("/helper", helperController.fetchHelpers);
app.get("/helper/:id", helperController.fetchHelper);
app.put("/helper/:id",  helperController.updateHelper); 
app.delete("/helper/:id",  helperController.deleteHelper); 


app.post("/personalitem",requireAuth, personalItemController.createItemPersonal); 
app.get("/personalitem", personalItemController.fetchItemsPersonal);
app.get("/personalitem/:id", personalItemController.fetchItemPersonal);
app.put("/personalitem/:id",  personalItemController.updateItemPersonal); 
app.delete("/personalitem/:id",  personalItemController.deleteItemPersonal); 

// Start our server
app.listen(process.env.PORT);
