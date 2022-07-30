const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const { Stage } = require("./stage");
const { buffer } = require("./inputBuffer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/code", express.static("code"));

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", credentials: true } });
const stage = new Stage(io);

io.on("connect", (socket) => {
    socket.once("def", (def) => {
        stage.addPlayer(socket.id, { def });
    });

    socket.on("position", (pos) => {
        if (pos === null) { return; }
        buffer.set(socket.id, pos);
    });

    socket.on("disconnect", () => {
        io.emit("exit", socket.id);
        stage.removePlayer(socket.id);
    });
});
setInterval(stage.update.bind(stage), 20);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server up and running on port ${port}.`));
