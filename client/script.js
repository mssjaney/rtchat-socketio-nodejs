const content = document.getElementById("content");
const messageInput = document.querySelector(".field");
const sendBtn = document.querySelector(".send");

const nameInput = document.querySelector(".name");
const roomInput = document.querySelector(".chatroom");
const joinBtn = document.querySelector(".joinroom");

sendBtn.addEventListener("click", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return;
    displayMessage(message);

    messageInput.value = "";
});

joinBtn.addEventListener("click", () => {
    const room = roomInput.value;
});

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    content.append(div);
}