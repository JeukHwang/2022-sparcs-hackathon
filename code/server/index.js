const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const { PlayerData } = require("./playerData");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/code", express.static("code"));

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

const playerData = new PlayerData();

io.on("connect", (socket) => {
    // console.log("new user enters");

    socket.on("position", (pos) => {
        // console.log("socketID", socket.id, "position:", pos);
        playerData.setPos(socket.id, pos);
    });

    // socket.emit("realPosition", data);
});

function update() {
    io.emit(playerData.getAllPos());
}

setInterval(update, 10);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server up and running on port ${port}.`));
