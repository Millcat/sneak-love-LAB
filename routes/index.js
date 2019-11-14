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

router.get("/create-sneaker", (req, res) => {
  res.render("products_add");
});

router.post("/create-sneaker", uploader.single("image"), (req, res) => {
  console.log(req.file)
  const newSneaker = req.body
  if (req.file) newSneaker.image = req.file.secure_url;
  sneakerModel
    .create(newSneaker)
    .then(dbRes => {
      res.redirect("/manage-sneakers");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/manage-sneakers", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => {
      console.log(dbRes);
      res.render("products_manage", {
        sneakers: dbRes
      });
    })
    .catch(dbErr => console.log(dbErr));
});


router.get("/product-edit/:id", (req, res) => {
  sneakerModel
    .findOne({
      _id: {
        $eq: req.params.id
      }
    })
    .then(dbRes => {
      res.render("product_edit", {
        sneaker: dbRes
      });
    })
    .catch(dbErr => console.error(dbErr));
});


router.post("/product-edit/:id", (req, res) => {
  sneakerModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      // console.log(dbRes);
      res.redirect("/manage-sneakers");
    })
    .catch(dbErr => console.log("err", dbErr));
});


router.get("/delete-sneaker/:id", (req, res) => {
  sneakerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/manage-sneakers");
    })
    .catch(dbErr => console.log("err", dbErr));
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