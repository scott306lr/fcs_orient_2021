const router = require("express").Router();
const Message = require("../models/Message");

// get latest 200 message information
router.get("/",async(req,res)=>{
    try{
        const message = await Message.find().sort({_id:-1}).limit(200);
        res.status(200).json(message.reverse());
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new message
router.post("/",async(req,res)=>{
    const newPost = new Message({
        time: req.body.time,
        name: req.body.name,
        role: req.body.role,
        teamId: req.body.teamId,
        content: req.body.content,
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