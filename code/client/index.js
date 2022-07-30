// import { io } from "socket.io-client";
// eslint-disable-next-line import/no-unresolved
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { Mouse } from "./mouse.js";


window.onload = () => {
    // console.log("Start");
    const socket = io.connect("http://localhost:3000");
    const playerInfo = {
        name: `tester ${Math.floor(Math.random() * 10)}`,
        color: "red",
    };
    socket.on("playerInfo", playerInfo);
    const stage = document.getElementById("stage");
    const mouse = new Mouse(stage);
    // const chr = new Character(stage);
    setInterval(() => {
        socket.emit("position", mouse.pos);
        // console.log(mouse.pos);
        if (mouse.pos !== null) {
            chr.show();
            chr.setPos(mouse.pos);
        } else {
            chr.hide();
        }
    }, 10);
    socket.on("update", (allPos) => {
        allPos.forEach((pos) => {

        });
        console.log(pos);
    });
};
