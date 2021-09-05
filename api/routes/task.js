const router = require("express").Router();
const Task = require("../models/Task");

// get a task information by taskId
router.get("/:taskId",async(req,res)=>{
    try{
        const task = await Task.findOne({tid:req.params.taskId});
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new task
router.post("/",async(req,res)=>{
    const newPost = new Task({
        taskId: req.body.taskId,
        taskName: req.body.taskName,
        question: req.body.question,
        answer: req.body.answer,
        qtype: req.body.qtype,
        locationX: req.body.locationX,
        locationY: req.body.locationY,
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