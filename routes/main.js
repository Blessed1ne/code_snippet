const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/Users")
const bcrypt = require("bcryptjs")
const Snippet = require("../models/Snippets")

const requireAuth = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}
// get
router.get("/", requireAuth, function(req, res) {
  Snippet.find().then(function(newSnippet) {
    res.render("index", {
      newSnippet: newSnippet
    })
  })
})

router.get("/register", function(req, res) {
  res.render("register")
})

router.post("/register", function(req, res) {
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password

  const user = new Users()
  user.name = name
  user.email = email
  user.username = username
  user.passwordHash = bcrypt.hashSync(password, 8)
  user
    .save()
    .then(function(user) {
      res.redirect("/")
    })
    .catch(function(error) {
      res.render("register", {
        user: user,
        error: error.errors
      })
    })
})

router.get("/signOut", function(req, res) {
  req.session.user = null
  res.redirect("login")
})

module.exports = router
