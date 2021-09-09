const router = require("express").Router();
const User = require("../models/User");

// get a user information by uid
router.post("/login",async(req,res)=>{
    try{
        console.log(req.body.id);
        const user = await User.findById(req.body.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new user
router.post("/",async(req,res)=>{
    const newPost = new User({
        name: req.body.name,
        role: req.body.role,
        teamId: req.body.teamId,
    });
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;