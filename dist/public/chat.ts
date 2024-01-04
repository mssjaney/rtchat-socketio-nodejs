window.onload = function() {
    let messages = [];
    let socket = io.connect('http://localhost:3700');

    let field: HTMLInputElement = document.querySelector(".field");
    let sendBtn: HTMLElement = document.querySelector(".send");
    let content: HTMLElement = document.getElementById("content");

    socket.on('message', function(data) {

        if (data.message) {
            messages.push(data.message);

            let html = "";
            for (let i=0; i < messages.length; i++) {
                html += messages[i] + "<br />";
            }

            content.innerHTML = html;
            
        } else {
            console.log("Run into a problem: ", data);
        }
    });

    sendBtn.onclick = function() {
        let text = field.value;
        socket.emit('send', { message: text });
        field.value = "";
    }
}