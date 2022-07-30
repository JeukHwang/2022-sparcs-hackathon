// import { io } from "socket.io-client";
// eslint-disable-next-line import/no-unresolved
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { Mouse } from "./mouse.js";
import { PlayerData } from "./playerData.js";


window.onload = () => {
    const socket = io.connect("http://localhost:3000");
    const playerData = new PlayerData(socket);
    const colors = ["white", "maroon", "red", "yellow", "lime", "green", "aqua", "teal", "blue", "purple"];
    const playerDef = {
        name: `tester ${Math.floor(Math.random() * 10)}`,
        color: colors[Math.floor(Math.random() * 10)],
    };
    socket.emit("def", playerDef);
    const stage = document.getElementById("stage");
    const mouse = new Mouse(stage);
    setInterval(() => { socket.emit("position", { pos: mouse.pos }); }, 10);
    socket.on("update", (allData) => {
        allData.forEach((playerInfo) => {
            if (!playerData.has(playerInfo.id)) { playerData.addPlayer(playerInfo.id, playerInfo.color); }
            const player = playerData.getPlayer(playerInfo.id);
            player.move(playerInfo.pos);
            player.setPreyer(playerInfo.isPreyer);
        });
    });

    socket.on("exit", (id) => {
        playerData.deletePlayer(id);
    });
};
