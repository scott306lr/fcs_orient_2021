const router = require("express").Router();
const TeamTask = require("../models/TeamTask");
const Task = require("../models/Task");
const Team = require("../models/Team");

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const unlockTask = async(team_id, x, y, unlockCount) => {
    const teamTasks = await TeamTask.find({teamId: team_id});
    const teamTaskIds = teamTasks.map((teamTask) => teamTask.taskId );
    const tasks = await Task.find( {_id: {$nin: teamTaskIds}});

    // console.log(teamTaskIds);
    // console.log(tasks.map((t) => ({taskId: t._id})));

    const reqMan = x + y;
    var randPickedTasks = tasks.sort(
        function(a, b){
            const aMan = a.locationX + a.locationY;
            const bMan = b.locationX + b.locationY;

            return Math.abs(aMan - reqMan) - Math.abs(bMan - reqMan);
        }   
    ).slice(0, 5);
    shuffleArray(randPickedTasks);

    randPickedTasks = randPickedTasks.slice(0, unlockCount);
    //console.log(randPickedTasks.map((t) => ({x: t.locationX, y: t.locationY})));
    
    const tasksToSave = randPickedTasks.map((task) => ({
        teamId: team_id,
        taskName: task.taskName,
        taskId: task._id,
        qtype: task.qtype,
        done: false,
    }))

    await TeamTask.insertMany(tasksToSave);
    return tasksToSave;
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
        await TeamTask.deleteMany();
        res.status(200).json("deleted all task");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

const initTask = [
    {"teamId":"1", "taskName":"A", "taskId":"A", "qtype":"test", "done":false},
    {"teamId":"1", "taskName":"B", "taskId":"B", "qtype":"test", "done":false},
    {"teamId":"1", "taskName":"C", "taskId":"C", "qtype":"test", "done":false},
    {"teamId":"2", "taskName":"D", "taskId":"D", "qtype":"test", "done":false},
    {"teamId":"2", "taskName":"E", "taskId":"E", "qtype":"test", "done":false},
    {"teamId":"2", "taskName":"F", "taskId":"F", "qtype":"test", "done":false},
    {"teamId":"3", "taskName":"G", "taskId":"G", "qtype":"test", "done":false},
    {"teamId":"3", "taskName":"H", "taskId":"H", "qtype":"test", "done":false},
    {"teamId":"3", "taskName":"I", "taskId":"I", "qtype":"test", "done":false},
    {"teamId":"4", "taskName":"J", "taskId":"j", "qtype":"test", "done":false},
    {"teamId":"4", "taskName":"K", "taskId":"K", "qtype":"test", "done":false},
    {"teamId":"4", "taskName":"L", "taskId":"L", "qtype":"test", "done":false},
    {"teamId":"5", "taskName":"M", "taskId":"N", "qtype":"test", "done":false},
    {"teamId":"5", "taskName":"O", "taskId":"O", "qtype":"test", "done":false},
    {"teamId":"5", "taskName":"P", "taskId":"p", "qtype":"test", "done":false},
    {"teamId":"6", "taskName":"Q", "taskId":"Q", "qtype":"test", "done":false},
    {"teamId":"6", "taskName":"R", "taskId":"R", "qtype":"test", "done":false},
    {"teamId":"6", "taskName":"S", "taskId":"S", "qtype":"test", "done":false}
]

//initialize tasks for each team
router.post("/initTask",async(req,res)=>{
    try{
        await TeamTask.deleteMany();
        //await TeamTask.insertMany(initTask);
        //res.status(200).json("initial successful");
        
        const resTeams = await Team.find();
        //resTask = await Task.findById([])

        //console.log(resTeams);  
        resTeams.map( async(team) => (
            await unlockTask(team.id, 0, 0, 2)
        ));
        res.status(200).json("hi");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;