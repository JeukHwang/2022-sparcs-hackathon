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
    setInterval(() => {
        socket.emit("position", mouse.pos);
        // console.log(mouse.pos);
    }, 10);
    socket.on("update", (dataS) => {
        // console.log(dataS);
        dataS.forEach(({ id, data }) => {
            if (playerData.has(id)) {
                // if (data.alive) {
                const player = playerData.getPlayer(id);
                player.move(data.pos);
                // } else {
                //     playerData.deletePlayer(id);
                // }
            } else {
                playerData.addPlayer(id, data.def);
                const player = playerData.getPlayer(id);
                player.move(data.pos);
            }
        });
    });

    socket.on("exit", (id) => {
        playerData.deletePlayer(id);
    });
};
