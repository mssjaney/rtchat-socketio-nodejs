window.onload = function() {
    let messages = [];
    let socket = io.connect('http://localhost:3700');

    let field: HTMLInputElement = document.querySelector(".field");
    let sendBtn: HTMLElement = document.querySelector(".send");
    let content: HTMLElement = document.getElementById("content");

    let name: HTMLInputElement = document.querySelector(".name");
    let room: HTMLInputElement = document.querySelector(".chatroom");
    let joinBtn: HTMLElement = document.querySelector(".joinroom");

    socket.on('message', function(data) {

        if (data.message) {
            messages.push(data);

            let html = "";
            for (let i=0; i < messages.length; i++) {
                html += "<span id='title'><b>" + (messages[i].username ? messages[i].username : 'Server') + ": </span></b>";
                html += messages[i].message + "<br />";
            }

            content.innerHTML = html;
            
        } else {
            console.log("Run into a problem: ", data);
        }
    });

    socket.on('receive_message', (data) => {
        console.log('received ', data)
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
        } else {
            let text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    }

    sendBtn.onclick = sendMessage;

    field.onkeyup = function(e) {
        if (e.keyCode == 13) {
            sendMessage();
        }
    }
}