// check if we are in a production env or not
if (process.env.NODE_ENV !== "production") {
  // load dependencies for not production
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// require body-parser (external library helps send data from forms to post route)
const bodyParser = require("body-parser");

// import router from ./routes/index.js to a variable
const indexRouter = require("./routes/index");

// import author router
const authorRouter = require("./routes/authors");

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

// tell app to use body-parser (sending data vie url to server)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// ////////
// import mongoose from npm mongoose that we installed
const mongoose = require("mongoose");
// set up CONNECTION to database (via mongoose)
// - useNewUrlParser is for letting mongoose use new way of working with url
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// log if we are or not connected to db
const db = mongoose.connection;
db.on("error", (err) => console.log("not connected to mongoose"));
db.on("open", () => console.log("Connected to Mongoose!"));

// ////////

// tell app to use router by variable
app.use("/", indexRouter);

app.use("/authors", authorRouter);

// listen to a certain port (environment variable or 3000)
app.listen(process.env.PORT || 3000, () => console.log("server running"));
