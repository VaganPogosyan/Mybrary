const express = require("express");
// const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");

// All authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  // check if we passed a name field
  // req.query because get request sends info to query string
  if (req.query.name != null && req.query.name !== "") {
    // add that name to our search options object
    // regular expression search for part of the text
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    // find authors by no conditions - ({})
    const authors = await Author.find(searchOptions);
    // pass authors to authors/index page
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create author route
router.post("/", async (req, res) => {
  // res.send(req.body.name);
  // // send the body of our form we're posting to server
  const author = new Author({
    name: req.body.name,
  });
  try {
    // awaits to author.save() function to finish and then populates it into newAuthor variable
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

module.exports = router;
