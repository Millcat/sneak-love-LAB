const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");
const uploader = require("../config/cloudinary");

router.get("/", (req, res) => {
  res.render("index.hbs");
});


router.get("/sneakers/collection", (req, res) => {
  sneakerModel
    .find()
    .populate("id_tags")
    .then(sneakers => {

      tagModel.find()
        .then(tags => {
          res.render("products", {
            sneakers: sneakers,
            tags: tags,
            scripts: ["filter-tags.js"]
          });
        })
        .catch(dbErr => console.log(dbErr))
    })
});


router.get("/sneakers/:cat", (req, res) => {
  sneakerModel
    .find({
      category: req.params.cat
    })
    .populate("id_tags")
    .then(dbRes => {
      res.render("products", {
        sneakers: dbRes,
        category: req.params.cat
      })
    })
    .catch(dbErr => console.log(dbErr))
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel
    .findOne({
      _id: {
        $eq: req.params.id
      }
    })
    .then(dbRes => {
      res.render("one_product", {
        sneaker: dbRes,
      });
    })
    .catch(dbErr => console.log("err", dbErr));
});


router.post("/filtered-tags", (req, res) => {
  // console.log(req.query)
  console.log(req.body)
  // res.send("ok")
  sneakerModel
    .find({
      id_tags: ["5dcde0a848f92309f29a6086"]
    })
    .then(dbRes => {
      res.send(dbRes)
      // res.render("collections", {
      //   sneaker: dbRes,
      //   scripts: ["filter-tags.js"]
      // });
    })
    .catch(dbErr => console.log("err", dbErr));

});

module.exports = router;