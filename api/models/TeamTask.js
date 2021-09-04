const mongoose = require("mongoose");

const TeamTaskSchema = new mongoose.Schema({
    team:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("TeamTask", TeamTaskSchema, "TeamTask");