const d = document;
const w = window;

function enviarTexto(event) {
  event.preventDefault();
  event.stopPropagation();
  let campo = event.target.texto;

  doSend(campo.value);
  campo.value = "";
}

function init() {
  wsConnect();
}

function wsConnect() {
  websocket = new WebSocket("ws://localhost:4000");

  //!Asignacion de los callbacks
  websocket.onopen = function (evt) {
    onOpen(evt);
  };

  websocket.onClose = function (evt) {
    onClose(evt);
  };

  websocket.onmessage = function (evt) {
    onMessage(evt);
  };

  websocket.onerror = function (evt) {
    onerror(evt);
  };
}

function onOpen(evt) {
  d.getElementById("enviar").disabled = false;
  doSend("Hola Usuario soy un Bot llamado Bonnie");
}

function onClose(evt) {
  d.getElementById("enviar").disabled = true;
  d.getElementById("mensajes").innerHTML = "";

  setTimeout(function () {
    wsConnect();
  }, 2000);
}

function onMessage(evt) {
  let textArea = d.getElementById("mensajes");
  textArea.innerHTML += evt.data + "\n";
}

function onerror(evt) {
  console.error(`Error: ${evt}`);
}

function doSend(mensaje) {
  websocket.send(mensaje);
}

w.addEventListener("load", init, false);
