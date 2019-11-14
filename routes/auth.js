const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
// const uploader = require("./../config/cloudinary");
// if use of avatar in signup body => add middleware in router.post("/sign up", ...) : uploader.single("avatar"),

// Registering SIGNUP

router.post("/signup", (req, res, next) => {

    const user = req.body; // req.body contains the submited informations (out of post request)

    // if (req.file) user.avatar = req.file.secure_url;
    if (!user.email || !user.password) {
        res.redirect("/signup");
        // console.log("field missing")
        return;
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then(dbRes => {

                if (dbRes) return res.redirect("/signup");

                const salt = bcrypt.genSaltSync(10); // cryptography librairie
                const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
                user.password = hashed; // new user is ready for db
                console.log(req.body);
                userModel
                    .create(user) // name, lastname, email, password
                    .then(() => res.redirect("/signin"))
                    .catch(dbErr => console.log("user not created", dbErr));
            })
            .catch(dbErr => next(dbErr));
    }
});

// Login

router.post("/signin", (req, res, next) => {
    const user = req.body;

    if (!user.email || !user.password) {
        // one or more field is missing
        req.flash("error", "wrong credentials");
        return res.redirect("/signin");
    }

    userModel
        .findOne({
            email: user.email
        })
        .then(dbRes => {
            if (!dbRes) {
                // no user found with this email
                req.flash("error", "wrong credentials");
                return res.redirect("/signin");
            }
            // user has been found in DB !
            if (bcrypt.compareSync(user.password, dbRes.password)) {
                // encryption says : password match success
                req.flash("success", `welcome ${dbRes.email}`);
                req.session.currentUser = dbRes; // user is now in session... until session.destroy
                return res.redirect("/admin");
            } else {
                // encryption says : password match failde
                return res.redirect("/signin");
            }
        })
        .catch(dbErr => {
            console.log(dbErr);
            req.flash("error", "system error ><*");
            res.redirect("/signin")
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        res.locals.isLoggedIn = undefined;
        res.locals.isAdmin = undefined;
        res.redirect("/signin");
    });
});

console.log("entered in auth.js file !")

module.exports = router;