//load env variables
if(process.env.NODE_ENV!="production"){
require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToMongo=require('./config/connectToMongo');
const itemController=require('./routes/itemController');
const userController=require('./routes/userController');
const claimantController=require('./routes/claimantController');
const helperController=require('./routes/helperController');
const requireAuth = require('./middleware/requireAuth');

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:true,
  credentials:true
}));

//connect to the database
connectToMongo();

//Routing
app.post("/signup", userController.signup); 
app.post("/login", userController.login); 
app.get("/logout", userController.logout);
app.get("/check-auth",requireAuth,userController.checkAuth);

app.post("/item", requireAuth, itemController.createItem); 
app.get("/item",  requireAuth, itemController.fetchItems);
app.get("/item/personal",  requireAuth, itemController.fetchItemsPersonal);
app.get("/item/:id", requireAuth,  itemController.fetchItem);
app.put("/item/:id",  requireAuth, itemController.updateItem);
app.delete("/item/:id",  requireAuth, itemController.deleteItem);

app.post("/claimant", requireAuth, claimantController.createClaimant);
app.get("/claimant", requireAuth, claimantController.fetchClaimants);
app.get("/claimant/:id", requireAuth, claimantController.fetchClaimant);
app.put("/claimant/:id", requireAuth, claimantController.updateClaimant);
app.delete("/claimant/:id", requireAuth, claimantController.deleteClaimant);

app.post("/helper", requireAuth, helperController.createHelper);
app.get("/helper", requireAuth, helperController.fetchHelpers);
app.get("/helper/:id", requireAuth, helperController.fetchHelper);
app.put("/helper/:id", requireAuth, helperController.updateHelper);
app.delete("/helper/:id", requireAuth, helperController.deleteHelper);

//start our server
app.listen(process.env.PORT);