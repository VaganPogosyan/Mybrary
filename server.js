// check if we are in a production env or not
if (process.env.NODE_ENV !== "production") {
  // load dependencies for not production
  require("dotenv").config(".env");
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// import router from ./routes/index.js to a variable
const indexRouter = require("./routes/index");

// set the view engine
app.set("view engine", "ejs");

// set the path to folder where the views are coming from (__dirname - current folder) which is views folder
app.set("views", __dirname + "/views");

// hookup layouts
app.set("layout", "layouts/layout");

// tell express that we want to use layouts
app.use(expressLayouts);

// use folder with stylesheets css
app.use(express.static("public"));

// import mongoose from npm mongoose that we installed
const mongoose = require("mongoose");
// set up CONNECTION to database (via mongoose)
// - useNewUrlParser is for letting mongoose use new way of working with url
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// log if we are or not connected to db
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose!"));

// tell app to use router by variable
app.use("/", indexRouter);

// listen to a certain port (environment variable or 3000)
app.listen(process.env.PORT || 3000);
