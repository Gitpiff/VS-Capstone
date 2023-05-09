const express = require("express")
const authRouter = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//Signup
authRouter.post("/signup", (req, res, next) => {
    //1.- Check if username already exists
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        //2.- Check for errors
        if(err) {
            res.status(500) //generic "catch-all" error code
            return err(next)
        }
        if(user) {
            res.status(403) //forbidden
            return next(new Error("That username is already taken"))
        }
        //3.- If username is not taken
        //3.1 .- Store new user into a variable
        const newUser = new User(req.body)
        //4.- Save the new user
        newUser.save((err, savedUser) => {
            //4.1.- Check for errors
            if(err) {
                res.status(500) //generic "catch-all" error code
                return err(next)
            }
            //5.- If there's no error, then we have successfully created a new user
            //server needs to send back the new user and an authentication token
            //Create a new token, pass a payload and a secret
            //The payload is the user data, but it has to be in a form of an Object
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            // IMPORTANT jwt does NOT encrypt, it just to make sure the right person
            // is making the request, it acts as a form of authorization rather than encryption
            //6.- Send everything back to the client
            return res.status(201).send({token, savedUser})
        })
    })
})


//Login
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if(err) {
            res.status(500)
            return err(next)
        }
        //If the username does not exist
        if(!user) {
            res.status(403)
            return next(new Error ("Username incorrect"))
        }
        //If the password does not match
        if(req.body.password !== user.password) {
            res.status(403)
            return next(new Error ("Username incorrect"))
        }
        //If they match
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(201).send({token, user})
    })
})


module.exports = authRouter
