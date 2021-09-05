const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// TEAM_COUNT = 6
// const Teams = [...Array(TEAM_COUNT).keys()].map(x => ++x) // [1, 2, 3, 4, 5, 6]
// console.log(Teams)

var GameStatus = {
  in_game: false, 
  board_freeze: false,
}

io.on("connection", (socket) => {
  console.log("a user connected.")
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("join team", (team) => {
    socket.join(team);
    console.log(`ID: ${socket.id} joined team ${team}`)
  });
  
  socket.on("answered correct", (team, doneTask, newTasks) => {
    io.emit("update score");
    io.emit("update record", doneTask);
    io.to(team).emit("update tasks", newTasks);
    console.log(`${team} answered correct`);
  })

  socket.on("send message", ({ payload }) => {
    console.log("broadcasting message:")
    console.log(payload)
    socket.broadcast.emit("recieve message", payload);
  });

  socket.on("send announcement", ({ payload }) => {
    console.log("announcing...")
    io.emit("recieve message", payload);
  });


  //changing game status, for admin use only.
  socket.on("start game", () => {
    GameStatus.in_game = true;
    io.emit("status update", GameStatus)
    console.log(`start game!`);
  })

  socket.on("stop game", () => {
    GameStatus.in_game = false;
    io.emit("status update", GameStatus)
    console.log(`stop game!`);
  })

  socket.on("freeze board", () => {
    GameStatus.board_freeze = true;
    io.emit("status update", GameStatus)
    console.log(`freeze board!`);
  })

  socket.on("unfreeze board", () => {
    GameStatus.board_freeze = false;
    io.emit("board unfreezed")
    console.log(`unfreeze board!`);
  })
})



