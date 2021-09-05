const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    teamId:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema, "User");