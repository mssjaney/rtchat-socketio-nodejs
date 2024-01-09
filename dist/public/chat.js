window.onload = function () {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.querySelector(".field");
    var sendBtn = document.querySelector(".send");
    var content = document.getElementById("content");
    var name = document.querySelector(".name");
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            var html = "";
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