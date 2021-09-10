const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const PREFIX = '/backend'

dotenv.config();

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log('connected to mongoDB');
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const userRouter = require("./routes/user");
app.use(PREFIX+"/auth", userRouter);
const taskRouter = require("./routes/task");
app.use(PREFIX+"/task", taskRouter);
const messageRouter = require("./routes/message");
app.use(PREFIX+"/message", messageRouter);
const doneTaskRouter = require("./routes/doneTask");
app.use(PREFIX+"/doneTask", doneTaskRouter);
const teamTaskRouter = require("./routes/teamTask");
app.use(PREFIX+"/teamTask", teamTaskRouter);
const teamRouter = require("./routes/team");
app.use(PREFIX+"/team", teamRouter);

app.listen(8000,()=>{
    console.log("Backend server is running");
})