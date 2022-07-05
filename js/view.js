class DomEls {
  #form = document.getElementById("send-form");
  #msgInput = document.getElementById("msg_input");
  #msgContainer = document.querySelector(".chatbox__chat");

  getForm() {
    return this.#form;
  }
  getInput() {
    return this.#msgInput;
  }
  getContainer() {
    return this.#msgContainer;
  }
}

export default new DomEls();
