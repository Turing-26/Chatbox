// Node server to handle socket.io connections

const io = require("socket.io")(8000, {
  // The 2 ports allowed are the ones mentioned below, make sure you run either of the 2, or allow all
  cors: {
    origin: ["http://localhost:1234", "http://localhost:62374"],
  },
});

const users = {};

//running a socket.io server(which is basically treated as an instance of http)
io.on("connection", (socket) => {
  //   console.log(socket.id);
  socket.on("new-user-joined", (name) => {
    console.log(`New user ${name}`);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
      id: socket.id,
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("user-left", users[socket.id]);
  });
});
