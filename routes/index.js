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
      console.log(dbRes);
      res.render("one_product", {
        sneaker: dbRes,
      });
    })
    .catch(dbErr => console.log("err", dbErr));
});


router.get("/filtered-tags", (req, res) => {
  console.log(req.query);
  const q = req.query.tag === "true" ? {
    label: true
  } : {};
  sneakerModel
    .populate("id_tags")
    .find(q)
    .then(dbRes => {
      console.log(dbRes);
      res.send(dbRes)
    })
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;