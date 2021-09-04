const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // uid:{
    //     type:String,
    //     required:true,
    //     unique:true,
    // },
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
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema, "User");