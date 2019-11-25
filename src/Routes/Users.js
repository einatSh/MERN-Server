const express = require("express");
const router = express.Router();
//const bcrypt = require("bcrypt");

// import user model 
const user = require("../Models/User");

// get all users - route localhost:5000/users
router.get("/", async (req, res) => {
    try{
        const users = await user.find();
        res.json({users: users});
    }catch(err){
        res.status(200).json({message: err});
    }
})

// register a new user - route localhost:5000/users/register
router.post("/register", async (req,res) => {
    try{
        // get current number of records (registered users)
        //let count = await user.countDocuments().catch(err => console.log(err));
        // init new user 
        const newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        });

        // make sure email is unique - if email exists, user will not be added
        const existingUser = await user.findOne({email: req.body.email});
        console.log(existingUser);
        // if the user doesn't exist - return result of true (user was added to db)
        if(existingUser === null){
            await newUser.save().then(() => {
                currIndex++;
                res.json({userAdded: true});
            });
        }
        // else return result of false
        else {
            res.json({userAdded: false});
        }
    }catch(err){
        res.status(200).json({message: err});
    }
})


// login user by email and password - route localhost:5000/users/login
router.post("/login", async (req, res) => {
    try{
        const dbUser = await user.findOne({email: req.body.email});
        if(req.body.password != dbUser.password){
            res.json({user: null});
        }
        else {
            res.json({user: dbUser});
        }
    }
    catch(err) {
        res.status(200).json({message: err});
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