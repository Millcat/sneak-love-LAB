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
        res.redirect("/auth/signup");
        // console.log("field missing")
        return;
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then(dbRes => {
                if (dbRes) return res.redirect("/auth/signup");

                const salt = bcrypt.genSaltSync(10); // cryptography librairie
                const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
                user.password = hashed; // new user is ready for db
                // console.log(req.body);
                userModel
                    .create(user) // name, lastname, email, password
                    .then(() => res.redirect("/auth/signin")) // vers la home ?
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
        return res.redirect("/auth/signin");
    }

    userModel
        .findOne({
            email: user.email
        })
        .then(dbRes => { // dbRes = { name: "guui" }
            if (!dbRes) {
                // no user found with this email
                req.flash("error", "wrong credentials");
                return res.redirect("/auth/signin");
            }
            // user has been found in DB !
            if (bcrypt.compareSync(user.password, dbRes.password)) {
                // encryption says : password match success
                req.flash("success", `welcome ${dbRes.email}`);
                req.session.currentUser = dbRes; // user is now in session... until session.destroy
                console.log(req.session.currentUser);
                return res.redirect("/");
            } else {
                // encryption says : password match failde
                req.flash("error", "wrong password");
                return res.redirect("/auth/signin");
            }
        })
        .catch(dbErr => {
            console.log(dbErr);
            req.flash("error", "system error ><*");
            res.redirect("/auth/signin");
        });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/signin", (req, res) => {
    if (res.locals.error_msg.length > 0) { //
        res.render("signin", {
            msg: {
                status: "error",
                text: res.locals.error_msg[0]
            }
        });
    } else {
        res.render("signin");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        res.locals.isLoggedIn = undefined;
        res.redirect("/auth/signin"); // don't forget the /auth/ path !!!!
    });
});

console.log("entered in auth.js file !");

module.exports = router;