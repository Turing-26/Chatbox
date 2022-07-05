import view from "./view.js";

class ClientSide {
  #socket = io("http://localhost:8000");
  #curId = "";

  emitUser() {
    const newName = prompt("Enter username");
    this.#socket.emit("new-user-joined", newName);
  }

  createMsg() {
    const form = view.getForm();
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // console.log(view.getInput());
      const msg = view.getInput();
      const msgData = msg.value;
      const newMsg = document.createElement("div");
      newMsg.innerHTML = `<p>${msgData}</p>`;
      newMsg.classList.add("chatbox__msg");
      newMsg.classList.add("chatbox__msg--sent");

      const cont = view.getContainer();
      cont.insertAdjacentElement("afterbegin", newMsg);

      this.#socket.emit("send", msgData);
      msg.value = "";
    });
  }

  userJoined() {
    this.#socket.on("user-joined", (data) => {
      const msg = document.createElement("div");
      msg.innerHTML = `<p>${data} joined the chat</p>`;
      msg.classList.add("chatbox__user-joined");

      const cont = view.getContainer();
      cont.insertAdjacentElement("afterbegin", msg);
    });
  }

  sendMsg() {
    this.#socket.on("receive", (data) => {
      const cont = view.getContainer();
      const msg = document.createElement("div");
      if (
        cont.firstElementChild?.classList.contains("chatbox__msg--rec") &&
        this.#curId === data.id
      ) {
        msg.innerHTML = `
        <p>${data.message}</p>
        `;
      } else {
        this.#curId = data.id;
        msg.innerHTML = `
        <h4>${data.name}</h4>
        <p>${data.message}</p>
        `;
      }
      msg.classList.add("chatbox__msg");
      msg.classList.add("chatbox__msg--rec");

      cont.insertAdjacentElement("afterbegin", msg);
    });
  }

  userLeft() {
    this.#socket.on("user-left", (name) => {
      const msg = document.createElement("div");
      msg.innerHTML = `<p>${name} left the chat</p>`;
      msg.classList.add("chatbox__user-joined");

      const cont = view.getContainer();
      cont.insertAdjacentElement("afterbegin", msg);
    });
  }
}

export default new ClientSide();

// const newName = prompt("Enter username");
// socket.emit("new-user-joined", newName);

// socket.on("user-joined", (data) => {
//   const msg = document.createElement("div");
//   msg.innerHTML = `<p>${data} joined the chat<p>`;
//   msg.classList.add("chatbox__msg");
//   msg.classList.add("chatbox__msg--sent");

//   const cont = view.getContainer();
//   cont.insertAdjacentElement("afterbegin", msg);
// });
