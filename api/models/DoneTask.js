const mongoose = require("mongoose");

const DoneTaskSchema = new mongoose.Schema({
    taskId:{
        type:String,
        required:true,
    },
    teamId:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("DoneTask", DoneTaskSchema, "DoneTask");