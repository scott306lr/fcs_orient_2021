const router = require("express").Router();
const TeamTask = require("../models/TeamTask");
const Task = require("../models/Task");

const unlockTask = async(team_id, x, y, unlockCount) => {
    const teamTasks = await TeamTask.find({teamId: team_id});
    const teamTaskIds = teamTasks.map((teamTask) => teamTask.teamId );
    console.log(teamTaskIds)
    const task = await Task.find( {teamId: {$nor: teamTaskIds}});

    const reqMan = x + y;
    const randPickedTasks = task.sort(
        function(a, b){
            const aMan = a.locationX + a.locationY;
            const bMan = b.locationX + b.locationY;
            if (Math.random() < 0.1)
                return Math.abs(aMan - reqMan) > Math.abs(bMan - reqMan);
            else 
                return Math.random() <= 0.5;
        }   
    ).slice(0, unlockCount);
    console.log(randPickedTasks);
    
    const tasksToSave = randPickedTasks.map((task) => ({
        teamId: team_id,
        taskName: task.taskName,
        taskId: task.taskId,
        qtype: task.qtype,
        done: false,
    }))

    const savePost = await TeamTask.insertMany(tasksToSave);
    return savePost;
}

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
        const savePost = await unlockTask(req.params.teamId, req.body.locationX, req.body.locationY, 2); // unlockCount = 3
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
        await TeamTask.deleteMany();
        
        resTeams = await Team.find();
        //resTask = await Task.findById([])

        resTeams.map( async(team) => (
            await unlockTask(team.teamId, 0, 0, 2)
        ));
        //res.status(200).json("deleted all task");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;