const mongoose = require("mongoose")

const snippetSchema = new mongoose.Schema ({
  title: {type: String, required: true},
  snippet: {type: String, required: true},
  notes: {type: String},
  language: {type: String, required: true},
  tags: {type:String}
})

const Snippet = mongoose.model("Snippet", snippetSchema)

module.exports = Snippet
