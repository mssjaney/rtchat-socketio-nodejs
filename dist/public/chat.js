window.onload = function () {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.querySelector(".field");
    var sendBtn = document.querySelector(".send");
    var content = document.getElementById("content");
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            var html = "";
            for (var i = 0; i < messages.length; i++) {
                html += messages[i] + "<br />";
            }
            content.innerHTML = html;
        }
        else {
            console.log("Run into a problem: ", data);
        }
    });
    sendBtn.onclick = function () {
        var text = field.value;
        socket.emit('send', { message: text });
        field.value = "";
    };
};
//# sourceMappingURL=chat.js.map