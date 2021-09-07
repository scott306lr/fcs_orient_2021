const router = require("express").Router();
const TeamTask = require("../models/TeamTask");
const Task = require("../models/Task");

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

router.post("/unlock/:teamId",async(req,res)=>{

    try{
        const teamTasks = await TeamTask.find({teamId: req.params.teamId});
        const teamTaskIds = teamTasks.map((teamTask) => teamTask.teamId );
        console.log(teamTaskIds)
        const task = await Task.find( {teamId: {$nor: teamTaskIds}});

        const reqMan = parseInt(req.body.locationX) + parseInt(req.body.locationY);
        const randPickedTasks = task.sort(
            function(a, b){
                const aMan = (parseInt(a.locationX) + parseInt(a.locationY));
                const bMan = (parseInt(b.locationX) + parseInt(b.locationY));
                if (Math.random() < 0.1)
                    return Math.abs(aMan - reqMan) > Math.abs(bMan - reqMan);
                else 
                    return Math.random() <= 0.5;
            }   
        ).slice(0,2);
        console.log(randPickedTasks);
        
        const tasksToSave = randPickedTasks.map((task) => ({
            teamId: req.params.teamId,
            taskName: task.taskName,
            taskId: task.taskId,
            qtype: task.qtype,
            done: false,
        }))

        const savePost = await TeamTask.insertMany(tasksToSave);
        res.status(200).json(savePost);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// update done
router.post("/done",async(req,res)=>{
    try{
        const teamTask = await TeamTask.findOne({teamId:req.body.teamId, taskId:req.body.taskId});
        teamTask.done = true;
        teamTask.save();
        res.status(200).json("update successfully");
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
        await TeamTask.deleteMany({});
        res.status(200).json("deleted all task");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

//initialize tasks for each team
router.post("/initTask",async(req,res)=>{
    try{
        await TeamTask.deleteMany({});
        
        res = await Team.findById([1, 2, 3, 4, 5]);
        
        //res.status(200).json("deleted all task");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;