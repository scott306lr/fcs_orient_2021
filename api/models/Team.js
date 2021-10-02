const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamName:{
        type:String,
        required:true,
    },
    teamEmoji:{
        type:String,
        required:true,
    },
    teamColor:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Team", TeamSchema, "Team");