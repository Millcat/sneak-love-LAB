const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const uploader = require("../config/cloudinary");

router.get("/", (req, res) => {
  res.render("index.hbs");
});


router.get("/sneakers/collection", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => {
      res.render("products", {
        sneakers: dbRes
      });
    })
    .catch(dbErr => console.log(dbErr))
});


router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
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






module.exports = router;