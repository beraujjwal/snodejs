const User = require("../models/user.model");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./User");

exports.socket = function (io) {
  io.on("connection", (socket) => {
    console.log("🔥 Socket connected: ", socket.id);
    socket.on("join", ({ user, room }, callback) => {
      const { error, socketUser } = addUser({
        id: socket.id,
        user,
        room:
          typeof room === "string" || room instanceof String ? [room] : room,
      });

      if (error) return callback(error);

      // Emit will send message to the user who had joined
      socket.emit("message", {
        user: "admin",
        text: `${socketUser.user.name},
            welcome to room ${socketUser.room}.`,
      });

      // Broadcast will send message to everyone in the room except the joined user
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}, has joined`,
      });

      socket.join(user.room);

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    });

    socket.on("socketdisconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} had left`,
        });
      }
    });
  });
};
