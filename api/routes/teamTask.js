const router = require("express").Router();
const TeamTask = require("../models/TeamTask");

// get teamtask information
router.get("/:teamId",async(req,res)=>{
    try{
        const teamTask = await TeamTask.find({teamId:req.params.teamId});
        res.status(200).json(teamTask);
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