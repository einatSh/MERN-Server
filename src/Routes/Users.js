const express = require("express");
const router = express.Router();
//const bcrypt = require("bcrypt");

// import user model 
const user = require("../Models/User");

// get all users - route localhost:5000/users
router.get("/", async (req, res) => {
    try{
        const users = await user.find();
        res.json(users);
    }catch(err){
        console.log(err);
    }
})

// login user by email and password - route localhost:5000/users/login
router.get("/login", async (req, res) => {
    res.send("we are on login for user " + req.params.firstName + req.params.lastName);
    try{
        const getuser = await user.findById(req.params.email);
        res.json(getuser);
    }catch(err) {
        console.log(err);
    }
})

// register a new user - route localhost:5000/users/register
router.post("/register", async (req,res) => {
    const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    })

    try{
        const savedUser = await newUser.save();
        res.json(savedUser);
    }catch(err){
        res.status(422).json("duplicate key error")
    }
})

// delete a user 
router.delete("/delete", async (req, res) => {
    try{

        const users = await user.find().sort({email: req.params.email});
        const toRemove = await user.remove(users).then(() => res.json("user deleted"));
        res.json(toRemove);
    }catch(err){
        console.log(err);
    } 
})

//update user
router.patch("/update", async (req, res) => {
    try{
        const toUpdate = await user.updateOne({email: req.params.email}, 
            {$set: {firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                email: req.body.email, 
                userName: req.body.userName,
                password: req.body.password
            }
        });
        res.json(toUpdate);
    }catch(err){
        console.log(err);
    }
})


// get specific user by email - route localhost:5000/users/getUser
router.get("/getUser", async (req, res) => {
    try{
        const getuser = await user.findOne().sort({email: req.body.email});
        // const resUser = getuser === null ? null : {
        //     firstName: getuser.firstName,
        //     lastName: getuser.lastName,
        //     email: getuser.email,
        //     userName: getuser.userName,
        //     password: getuser.password
        // }
        console.log(getuser);
        res.json(getuser);
    }catch(err) {
        console.log(err);
    }
})





module.exports = router;