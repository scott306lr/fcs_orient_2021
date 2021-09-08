const router = require("express").Router();
const Team = require("../models/Team");

// get team information
router.get("/",async(req,res)=>{
    try{
        const team = await Team.find();
        res.status(200).json(team);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new team
router.post("/",async(req,res)=>{
    const newPost = new Team({
        teamName: req.body.teamName,
    });
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// update team name
router.post("/update_name/:id",async(req,res)=>{
    try{
        const team = await Team.findById(req.params.id);
        team.teamName = req.body.teamName;
        team.save();
        res.status(200).json("update team name successfully");
    }
    catch(err){
        res.status(500).json(err);
    }
})

// update medal
// router.post("/update_medal/:id",async(req,res)=>{
//     try{
//         const team = await Team.findById(req.params.id);
//         team.gold = req.body.gold;
//         team.silver = req.body.silver;
//         team.bronze = req.body.bronze;
//         team.iron = req.body.iron;
//         team.score = (parseInt(req.body.gold)*4 + parseInt(req.body.silver)*3 + parseInt(req.body.bronze)*2 + parseInt(req.body.iron)*1).toString();
//         team.save();
//         res.status(200).json("update medal successfully");
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })


module.exports = router;