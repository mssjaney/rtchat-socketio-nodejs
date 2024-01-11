import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

let app = express();
let port = 3700;

app.use(cors());

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res) {
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

let server = app.listen(port);
let io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: ' This is real-time chatbot built in NodeJS on top of OpenAI API' });
    socket.on('join_room', (data) => {
        const { username, room } = data;
        socket.join(room);
        console.log("hello room");
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the room`,
            username: 'CHAT_BOT'
        });
    });
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});
