const express = require("express")
const authRouter = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//Signup
authRouter.post("/signup", (req, res, next) => {
    //Check if username already exists
    User.findOne({username: req.body.username}, (err, user) => {
        //Check for errors
        if(err) {
            res.status(500) //generic "catch-all" error code
            return err(next)
        }
        if(user) {
            res.status(403) //forbidden
            return next(new Error("That username is already taken"))
        }
        //If username is not taken
        //store new user into a variable
        const newUser = new User(req.body)
        //save the new user
        newUser.save((err, savedUser) => {
            //Check for errors
            if(err) {
                res.status(500) //generic "catch-all" error code
                return err(next)
            }
            //If there's no error, then we have successfully created a new user
            //server needs to send back the new user and an authentication token
            //Create a new token, pass a payload and a secret
            //The payload is the user data, but it has to be in a form of an Object
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            //send everything back to the client
            return res.status(201).send({token, savedUser})
        })
    })
})


module.exports = authRouter
