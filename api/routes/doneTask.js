const router = require("express").Router();
const DoneTask = require("../models/DoneTask");

// get all donetask information
router.get("/",async(req,res)=>{
    try{
        const doneTask = await DoneTask.find();
        res.status(200).json(doneTask);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new donetask
router.post("/",async(req,res)=>{
    const newPost = new DoneTask({
        tid: req.body.tid,
        time: req.body.time,
        team: req.body.team,
        score: req.body.score,
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