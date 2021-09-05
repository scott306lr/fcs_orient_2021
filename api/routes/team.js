const router = require("express").Router();
const Team = require("../models/Team");

// get team information
router.get("/:id",async(req,res)=>{
    try{
        const team = await Team.findById(req.params.id);
        res.status(200).json(team);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// add a new team
router.post("/",async(req,res)=>{
    const newPost = new Team({
        teamId: req.body.teamId,
        teamName: req.body.teamName,
        gold: req.body.gold,
        silver: req.body.silver,
        bronze: req.body.bronze,
        iron: req.body.iron,
        score: req.body.score
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