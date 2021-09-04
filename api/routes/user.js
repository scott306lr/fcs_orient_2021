const router = require("express").Router();
const User = require("../models/User");

// get a user information by uid
router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new user
router.post("/",async(req,res)=>{
    const newPost = new User({
        // uid: req.body.uid,
        name: req.body.name,
        role: req.body.role,
        team: req.body.team,
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