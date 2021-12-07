// we need to use mongoose' schema (which is a table in a db)

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// export schema as a new model
module.exports = mongoose.model("Author", authorSchema);
