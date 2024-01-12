window.onload = function () {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.querySelector(".field");
    var sendBtn = document.querySelector(".send");
    var content = document.getElementById("content");
    var name = document.querySelector(".name");
    var room = document.querySelector(".chatroom");
    var joinBtn = document.querySelector(".joinroom");
    var html = "";
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            
            for (var i = 0; i < messages.length; i++) {
                html += "<span id='title'><b>" + (messages[i].username ? messages[i].username : 'Server') + ": </span></b>";
                html += messages[i].message + "<br />";
            }
            content.innerHTML = html;
        }
        else {
            console.log("Run into a problem: ", data);
        }
    });
    socket.on('receive_message', function (data) {
        console.log('received ', data);
        html += data.message;
        content.innerHTML = html;
    });
    socket.on('join_room', function(data) {
        console.log('join room received ', data)
    });
    function joinRoom() {
        if (room.value !== '' && name.value !== '') {
            socket.emit('join_room', { username: name.value, room: room.value });
            console.log(room.value, name.value);
        }
    }
    joinBtn.onclick = joinRoom;
    function sendMessage() {
        if (name.value === "") {
            alert('Please, type your Name');
        }
        else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    }
    sendBtn.onclick = sendMessage;
    field.onkeyup = function (e) {
        if (e.keyCode == 13) {
            sendMessage();
        }
    };
};
//# sourceMappingURL=chat.js.map