import { io } from "socket.io-client";

const content = document.getElementById("content");
const messageInput = document.querySelector(".field");
const sendBtn = document.querySelector(".send");

const nameInput = document.querySelector(".name");
const roomInput = document.querySelector(".chatroom");
const joinBtn = document.querySelector(".joinroom");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    displayMessage(`Connected with id: ${socket.id}`);
});

socket.on("receive-message", message => {
    displayMessage(message);
});

sendBtn.addEventListener("click", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return;
    displayMessage(message);
    socket.emit("send-message", message);

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