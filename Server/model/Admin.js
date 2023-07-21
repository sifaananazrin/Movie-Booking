const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: "string",
    required: true
  },
  password: {
    type: "string",
    required: true
  },
  addMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie"
    }
  ]
});




module.exports = mongoose.model("Admin", adminSchema);
