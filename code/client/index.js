// import { io } from "socket.io-client";
// eslint-disable-next-line import/no-unresolved
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { leaderboard } from "./leaderboard.js";
import { Mouse } from "./mouse.js";
import { PlayerData } from "./playerData.js";


window.onload = () => {
    const socket = io.connect("http://localhost:3000");
    const playerData = new PlayerData(socket);
    // const nickname = prompt("nickname");
    // const password = prompt("password");
    // socket.on("sign", (msg) => {
    //     if (msg) {
    //         alert("login success!");
    //     } else {
    //         alert("fail to login");
    //     }
    // });
    // socket.emit("sign", { nickname, password });
    const colors = ["white", "maroon", "red", "yellow", "lime", "green", "aqua", "teal", "blue", "purple"];
    const playerDef = {
        name: `tester ${Math.floor(Math.random() * 10)}`,
        color: colors[Math.floor(Math.random() * 10)],
    };
    socket.emit("def", playerDef);
    const stage = document.getElementById("stage");
    const mouse = new Mouse(stage);
    setInterval(() => { socket.emit("position", { pos: mouse.pos }); }, 10);

    const button = document.getElementById("button");
    let timebuffer = 0;
    button.addEventListener("click", () => {
        socket.emit("game", { msg: true });
        timebuffer = Date.now();
    });

    setInterval(async () => {
        let resolver = () => undefined;
        const promise = new Promise((resolve) => { resolver = resolve; });
        socket.once("get_leaderboard", (args) => { resolver(args); });
        socket.emit("get_leaderboard");
        const nameScore = await promise;
        nameScore.sort((a, b) => b.score - a.score);
        console.log(nameScore);
        leaderboard.setData(nameScore);

        if (Date.now - timebuffer > 30000) {
            socket.emit("game", { msg: false });
        }
    }, 3000);

    socket.on("update", (allData) => {
        allData.forEach((playerInfo) => {
            if (!playerData.has(playerInfo.id)) { playerData.addPlayer(playerInfo.id, playerInfo.color); }
            const player = playerData.getPlayer(playerInfo.id);
            player.move(playerInfo.pos);
            player.setPreyer(playerInfo.isPreyer);
        });
    });

    socket.on("exit", ({ id }) => {
        playerData.deletePlayer(id);
    });
};
