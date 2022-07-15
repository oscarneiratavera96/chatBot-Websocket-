const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const webSocketServer = require("websocket").server;

app.set("puerto", 4000);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

const wsServer = new webSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

let conn = null;

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  conn = connection;
  connection.on("message", (message) => {
    console.log(`Mensaje recibido: ${message.utf8Data}`);
    connection.sendUTF(`Recibido ✔️​: ${message.utf8Data}`);

    if (message.utf8Data.toLowerCase() === "bonnie?") {
      setTimeout(() => {
        connection.sendUTF(`🤖:Si ese el nombre que me ha dado mi creador.`);
      }, 1000);
    }

    if (message.utf8Data.toLowerCase() === "") {
      setTimeout(() => {
        connection.sendUTF(`🤖:Por favor escribe algo.`);
      }, 1000);
    }

    if (
      message.utf8Data.toLowerCase() === "quien es tu creador?" ||
      message.utf8Data.toLowerCase() === "quien es tu creador" ||
      message.utf8Data.toLowerCase() === "quien es tu padre" ||
      message.utf8Data.toLowerCase() === "quien es tu padre?"
    ) {
      setTimeout(() => {
        connection.sendUTF(
          `🤖:Mi creador es Oscar Neira, es Colombiano y es desarrollador de software`
        );
      }, 1000);
    }

    if (
      message.utf8Data.toLowerCase() === "cual es tu funcion?" ||
      message.utf8Data.toLowerCase() === "cuál es tu función?" ||
      message.utf8Data.toLowerCase() === "cuál es tu funcion? " ||
      message.utf8Data.toLowerCase() === "cual es tu funcion" ||
      message.utf8Data.toLowerCase() === "cual es tu función"
    ) {
      setTimeout(() => {
        connection.sendUTF(`🤖: Estar a tu servicio`);
      }, 1000);
    }

    if (
      message.utf8Data.toLowerCase() === "en donde vives?" ||
      message.utf8Data.toLowerCase() === "donde vives?" ||
      message.utf8Data.toLowerCase() === "donde vives" ||
      message.utf8Data.toLowerCase() === "en donde vives"
    ) {
      setTimeout(() => {
        connection.sendUTF(`🤖: En un mundo llamado la internet`);
      }, 1000);
    }
  });

  connection.on("close", (reasonCode, descripton) => {
    console.log("El cliente se desconecto");
  });
});

server.listen(app.get("puerto"), () => {
  console.log(`Server iniciado en el puerto ${app.get("puerto")}`);
});
