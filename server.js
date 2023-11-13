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
app.get("/check-auth", userController.checkAuth);

app.post("/item", requireAuth, itemController.createItem); // This route requires authentication
app.get("/item", itemController.fetchItems);
app.get("/item/personal", requireAuth, itemController.fetchItemsPersonal); // This route requires authentication
app.get("/item/:id", itemController.fetchItem);
app.put("/item/:id", requireAuth, itemController.updateItem); // This route requires authentication
app.delete("/item/:id", requireAuth, itemController.deleteItem); // This route requires authentication

app.post("/claimant", requireAuth, claimantController.createClaimant); // This route requires authentication
app.get("/claimant", claimantController.fetchClaimants);
app.get("/claimant/:id", claimantController.fetchClaimant);
app.put("/claimant/:id", requireAuth, claimantController.updateClaimant); // This route requires authentication
app.delete("/claimant/:id", requireAuth, claimantController.deleteClaimant); // This route requires authentication

app.post("/helper", requireAuth, helperController.createHelper); // This route requires authentication
app.get("/helper", helperController.fetchHelpers);
app.get("/helper/:id", helperController.fetchHelper);
app.put("/helper/:id", requireAuth, helperController.updateHelper); // This route requires authentication
app.delete("/helper/:id", requireAuth, helperController.deleteHelper); // This route requires authentication

// Start our server
app.listen(process.env.PORT);
