const router = require("express").Router();
const TeamTask = require("../models/TeamTask");

// add tasks for new team, closet task has higher probability
router.post("/:teamId",async(req,res)=>{
    try{
        const teamTask = await Task.find({teamId:req.params.teamId});
        res.status(200).json(teamTask);
    }
    catch(err){
        res.status(500).json(err);
    }

    const newPost = new TeamTask({
        teamId: req.body.teamId,
        taskName: req.body.taskName,
        taskId: req.body.taskId,
        qtype: req.body.qtype,
        done: req.body.done
    });
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// get latest 200 message information
router.post("/newTask", async(req,res)=>{
    try{
        const message = await Message.find().sort({_id:-1}).limit(200);
        res.status(200).json(message.reverse());
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new teamTask
router.post("/",async(req,res)=>{
    const newPost = new TeamTask({
        teamId: req.body.teamId,
        taskName: req.body.taskName,
        taskId: req.body.taskId,
        qtype: req.body.qtype,
        done: req.body.done
    });
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//delete all
router.delete("/",async(req,res)=>{
    try{
        const user = await TeamTask.deleteMany();
        res.status(200).json("teamTask has been delete")
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;