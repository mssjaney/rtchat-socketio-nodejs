import * as express from 'express';
import { Server } from 'socket.io';

let app = express();
let port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res) {
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

let server = app.listen(port);
let io = new Server(server);

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: 'Welcome to the chat board' });
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});
