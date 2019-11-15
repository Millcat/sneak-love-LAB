const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const uploader = require("../config/cloudinary");

router.get("/prod-add", (req, res) => {
    res.render("products_add");
});


router.post("/prod-add", uploader.single("image"), (req, res) => {

    const newSneaker = req.body

    if (req.file) newSneaker.image = req.file.secure_url;
    sneakerModel
        .create(newSneaker)
        .then(dbRes => {
            res.redirect("/prod-manage");
        })
        .catch(dbErr => console.error(dbErr));
});

router.get("/prod-manage", (req, res) => {
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
            res.redirect("/prod-manage");
        })
        .catch(dbErr => console.log("err", dbErr));
});


router.get("/delete-sneaker/:id", (req, res) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then(dbRes => {
            res.redirect("/prod-manage");
        })
        .catch(dbErr => console.log("err", dbErr));
});


module.exports = router;