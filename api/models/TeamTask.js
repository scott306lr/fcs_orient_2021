const mongoose = require("mongoose");

const TeamTaskSchema = new mongoose.Schema({
    teamId:{
        type:String,
        required:true,
    },
    taskName:{
        type:String,
        required:true,
    },
    taskId:{
        type:String,
        required:true,
    },
    qtype:{
        type:String,
        required:true,
    },
    done:{
        type:Boolean,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("TeamTask", TeamTaskSchema, "TeamTask");