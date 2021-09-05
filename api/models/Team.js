const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamId:{
        type:String,
        required:true,
    },
    teamName:{
        type:String,
        required:true,
    },
    gold:{
        type:String,
    },
    silver:{
        type:String,
    },
    bronze:{
        type:String,
    },
    iron:{
        type:String,
    },
    score:{
        type:String,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Team", TeamSchema, "Team");