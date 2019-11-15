const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");
const uploader = require("../config/cloudinary");


router.get("/create-sneaker", (req, res) => {
    tagModel
        .find()
        .then(dbRes => {
            res.render("products_add", {
                tags: dbRes
            });
        })
        .catch(dbErr => {
            console.log(dbErr);
        })
});


router.post("/create-sneaker", uploader.single("image"), (req, res) => {
    console.log(req)
    const newSneaker = req.body
    if (req.file) newSneaker.image = req.file.secure_url;

    sneakerModel
        .create(newSneaker)
        .then(dbRes => {
            res.redirect("/manage-sneakers");
        })
        .catch(dbErr => console.error(dbErr));
});

router.post("/create-tag", (req, res) => {
    tagModel
        .create(req.body)
        .then(dbRes => {
            res.redirect("/create-sneaker")
        })
        .catch(dbErr => console.log(dbErr))
})

router.get("/manage-sneakers", (req, res) => {
    sneakerModel
        .find()
        .populate("id_tags")
        .then(dbRes => {
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
        .then(sneaker => {
            tagModel
                .find()
                .then(tags => {
                    res.render("product_edit", {
                        sneaker: sneaker,
                        tags: tags
                    });
                })
                .catch(dbErr => console.error(dbErr));
        })
});


router.post("/product-edit/:id", uploader.single("image"), (req, res) => {

    console.log(req.file)
    const newSneaker = req.body
    if (req.file) newSneaker.image = req.file.secure_url;

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


module.exports = router;