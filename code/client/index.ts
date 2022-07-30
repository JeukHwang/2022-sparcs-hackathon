// import { io } from "socket.io-client";
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import type { PlayerInfo, SocketUpdateType } from "../util";
import { Mouse } from "./mouse";
import { PlayerData } from "./playerData";

window.onload = () => {
    console.log("Start");
    const socket = io("http://localhost:3000");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const playerData = new PlayerData(socket);
    const colors = ["white", "maroon", "red", "yellow", "lime", "green", "aqua", "teal", "blue", "purple"];
    const playerDef = {
        name: `tester ${Math.floor(Math.random() * 10)}`,
        color: colors[Math.floor(Math.random() * 10)],
    };
    socket.emit("def", playerDef);
    const stage = document.getElementById("stage") as HTMLDivElement;
    const mouse = new Mouse(stage);
    setInterval(() => { socket.emit("position", mouse.pos); }, 10);
    socket.on("update", (allData:SocketUpdateType) => {
        allData.forEach((playerInfo : PlayerInfo) => {
            if (!playerData.has(playerInfo.id)) { playerData.addPlayer(playerInfo.id, playerInfo.color); }
            const player = playerData.getPlayer(playerInfo.id)!;
            player.move(playerInfo.pos);
            player.setPreyer(playerInfo.isPreyer);
        });
    });

    socket.on("exit", (id:string) => {
        playerData.deletePlayer(id);
    });
};
