const io = require("socket.io")(8900, {
  cors: {
    origin: [process.env.PUBLIC_URI, "http://localhost:3000"]
  }
});

var GameStatus = {
  in_game: false, 
  board_freeze: false,
  freeze_time: null,
}

var unfreeze_count = 0;

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.emit("status update", GameStatus);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("join team", (team) => {
    socket.join(team);
    console.log(`ID: ${socket.id} joined team ${team}`);
  });
  
  socket.on("answered correct", (team, newTasks, doneTask) => {
    io.emit("update record", doneTask);
    io.to(team).emit("update tasks", doneTask, newTasks);
    console.log(`${team} answered correct`);
  })

  socket.on("send message", ({ payload }) => {
    console.log("message:");
    console.log(payload);
    socket.broadcast.emit("recieve message", payload);
    socket.broadcast.emit("recieve announce", payload);
  });

  socket.on("send announcement", ({ payload }) => {
    console.log("announcing...");
    io.emit("recieve message", payload);
    io.emit("recieve announce", payload);
  });


  //changing game status, for admin use only.
  socket.on("start game", () => {
    GameStatus.in_game = true;
    io.emit("status update", GameStatus);
    console.log(`start game!`);
  })

  socket.on("stop game", () => {
    GameStatus.in_game = false;
    io.emit("status update", GameStatus);
    console.log(`stop game!`);
  })

  socket.on("freeze board", () => {
    GameStatus.board_freeze = true;
    GameStatus.freeze_time = new Date();
    unfreeze_count = 0;
    io.emit("status update", GameStatus);
    io.emit("ufCount update", unfreeze_count);
    console.log(`freeze board!`);
  })

  socket.on("unfreeze board", () => {
    GameStatus.board_freeze = false;
    unfreeze_count = 0;
    io.emit("status update", GameStatus);
    io.emit("ufCount update", unfreeze_count);
    console.log(`unfreeze board!`);
  })

  socket.on("update freezetime", () => {
    unfreeze_count += 1;
    io.emit("ufCount update", unfreeze_count);
    // console.log(`update board! ${unfreeze_count}`);
  })
})



