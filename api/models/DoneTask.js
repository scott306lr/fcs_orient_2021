const mongoose = require("mongoose");

const DoneTaskSchema = new mongoose.Schema({
    tid:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    team:{
        type:String,
        required:true,
    },
    score:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("DoneTask", DoneTaskSchema, "DoneTask");