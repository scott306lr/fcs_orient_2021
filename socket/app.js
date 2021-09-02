const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid person.
 * - if yes, join the client to the game. 
 * - else, reject. 
 * - '/'  path should tell client to login by QR code
 * - '/user/:passid'  path should first check for valid user, then join it. Otherwise, throw 404 error.  
 */

const TEAM_COUNT = 6

const server = http.createServer(app)
const io = socketio(server)


// get the passID encoded in the URL. 
// check if that passID exists in DB. 
// join to server and login. 


// updates when there's new messages.
// updates when there's new announcements.
// updates the whole team when there's new task / answered

const Teams = [...Array(TEAM_COUNT).keys()].map(x => ++x)
console.log(Teams)
// // connect client and join client to correct team. 
// io.on('connect', connect)

// // Run code when the client disconnects from their socket session. 
// io.on("disconnect", onDisconnect)

// // Let same team update task
// io.on("update task", updateTask)

// // Sends new message to everyone
// io.on('send msg', sendMsg)


// usually this is where we try to connect to our DB.
server.listen(process.env.PORT || 8000)