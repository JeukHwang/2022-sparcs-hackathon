const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const { Stage } = require("./stage");
const { buffer } = require("./inputBuffer");
const { createPlayer, findPlayer, updatePlayer, getAllScore } = require("./data");

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
        stage.addPlayer(socket.id, def);
    });

    socket.on("position", ({ pos }) => {
        if (pos === null) { return; }
        buffer.set(socket.id, pos);
    });

    socket.on("sign", async ({ nickname, password }) => {
        const players = await findPlayer(nickname);
        console.log(players);
        const existPlayer = players.length !== 0;
        if (!existPlayer) {
            await createPlayer(nickname, password, 0);
        } else {
            const isValidPassword = players[0].password === password;
            if (!isValidPassword) { socket.emit("sign", { msg: false }); return; }
        }
        socket.data = { isLogged: true, nickname };
        socket.emit("sign", { msg: true });
    });

    socket.on("game", (msg) => {
        if (msg && stage.playerNumber() > 1) {
            Stage.timebuffer = Date.now();
            const players = Array.from(stage.data.keys());
            stage.setPreyer(players[Math.floor(Math.random() * stage.playerNumber())].id, true);
        } else {
            stage.over();
        }
    });

    socket.on("get_leaderboard", async () => {
        const data = await getAllScore();
        socket.emit("get_leaderboard", data);
    });
    socket.on("disconnect", () => {
        if (!stage.data.has(socket.id)) { return; }
        stage.removePlayer(socket.id);
        const socketData = { id: socket.id };
        io.emit("exit", socketData);
    });
});
setInterval(stage.update.bind(stage), 20);

// Game loop
// setInterval(() => {
//     const playerIDs = Array.from(stage.data.keys());

// })

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server up and running on port ${port}.`));
