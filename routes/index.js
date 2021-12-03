// set up all the routes we need for application
const express = require("express");
const router = express.Router();

// root of app with function
router.get("/", (req, res) => {
  res.render("index");
});
// to use this router goota hook it up w/ app

// export router(var that we created)
module.exports = router;
