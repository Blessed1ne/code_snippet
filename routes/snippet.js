const express = require("express")
const router = express.Router()
const Snippet = require("../models/Snippets")

router.get("/snippet/:id", function(req, res){
  Snippet.findOne({_id: req.params.id}).then(function(snippet){
    res.render("snippet", {
      snippet:snippet
    })
  })
})

module.exports = router
