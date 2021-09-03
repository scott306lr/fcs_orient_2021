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
    io.emit("update score", doneTask);
    io.to(team).emit("update tasks", newTasks);
  })

  socket.on("send message", ({ payload }) => {
    socket.broadcast.emit("recieve message", payload);
  });


  //changing game status, for admin use only.
  socket.on("start game", () => {
    GameStatus.in_game = true;
    io.emit("status update", GameStatus)
  })

  socket.on("end game", () => {
    GameStatus.in_game = false;
    io.emit("status update", GameStatus)
  })

  socket.on("freeze board", () => {
    GameStatus.board_freeze = true;
    io.emit("status update", GameStatus)
  })

  socket.on("unfreeze board", () => {
    GameStatus.board_freeze = false;
    io.emit("board unfreezed")
  })
})



