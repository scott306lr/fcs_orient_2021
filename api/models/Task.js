const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskId:{
        type:String,
        required:true,
        unique:true,
    },
    taskName:{
        type:String,
        required:true,
    },
    question:{
        type:String,
    },
    answer:{
        type:String,
    },
    qtype:{
        type:String,
        required:true,
    },
    locationX:{
        type:String,
        required:true,
    },
    locationY:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Task", TaskSchema, "Task");