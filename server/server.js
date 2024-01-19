const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("send-message", (message, room) => {
        if (room === "") {
            socket.broadcast.emit("receive-message", message);
        } else {
            socket.to(room).emit("receive-message", message);
        }
    });

    socket.on("join-room", (room, callback) => {
        socket.join(room);
        callback(`Welcome to the ${room} room`);
    })
});

instrument(io, { auth: false });