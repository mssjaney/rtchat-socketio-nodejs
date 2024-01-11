"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var port = 3700;
app.use((0, cors_1.default)());
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function (req, res) {
    res.render("page");
});
app.use(express_1.default.static(__dirname + '/public'));
var server = app.listen(port);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: ' This is real-time chatbot built in NodeJS on top of OpenAI API' });
    socket.on('join_room', function (data) {
        var username = data.username, room = data.room;
        socket.join(room);
        console.log("hello room");
        socket.to(room).emit('receive_message', {
            message: "".concat(username, " has joined the room"),
            username: 'CHAT_BOT'
        });
    });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
//# sourceMappingURL=index.js.map