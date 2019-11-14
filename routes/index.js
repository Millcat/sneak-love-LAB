const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker")

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/collection", (req, res) => {
  res.render("products");
});

router.get("/create-sneaker", (req, res) => {
  res.render("products_add");
});

router.post("/create-sneaker", (req, res) => {
  sneakerModel
    .create(req.body)
    .then(apiRes => {
      console.log(apiRes)
      res.redirect("/manage-sneakers");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/manage-sneakers", (req, res) => {
  res.render("products_manage");
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;