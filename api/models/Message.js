const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    time:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    team:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Message", MessageSchema, "Message");