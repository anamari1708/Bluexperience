const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  workname: { type: String, required: true },
  mailsender: { type: String, required: true },
  place: { type: String, required: true },
  begining: { type: String, required: true },
  howlong: { type: String, required: true },
  salary: { type: Number, required: true },
  details: { type: String, required: true },
  workimage: { type: String, required: true },
  postDate: { type: Date, default: Date.now},
});

const Work = mongoose.model("work", workSchema);
module.exports = Work;