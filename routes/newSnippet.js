const express = require("express")
const router = express.Router()
const Snippet = require("../models/Snippets")
const bcrypt = require("bcryptjs")

router.get("/newSnippet", function(req, res){
  res.render("newSnippet")
})

router.post("/newSnippet", function(req, res){
  const title = req.body.title
  const snippet = req.body.snippet
  const notes = req.body.notes
  const language = req.body.language
  const tags = req.body.tags
  const newSnippet = new Snippet()
  newSnippet.title = title
  newSnippet.snippet = snippet
  newSnippet.notes = notes
  newSnippet.language = language
  newSnippet.tags = tags
  newSnippet.save().then(function(snippet){
    res.redirect("/")
  })
  .catch(function(error){
    console.log(error);
    res.render("newSnippet",{
      newSnippet: newSnippet,
      error: error.errors
    })
  })
})


module.exports = router
