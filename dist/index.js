"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket_io_1 = require("socket.io");
var app = express();
var port = 3700;
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function (req, res) {
    res.render("page");
});
app.use(express.static(__dirname + '/public'));
var server = app.listen(port);
var io = new socket_io_1.Server(server);
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: '> This is real-time chatbot built in NodeJS on top of OpenAI API' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
//# sourceMappingURL=index.js.map