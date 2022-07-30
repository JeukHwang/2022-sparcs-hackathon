const { buffer } = require("./inputBuffer");

class Stage {
    static width = 500;
    static height = 500;
    static center = { x: Stage.width / 2, y: Stage.height / 2 };
    static speed = 7;
    static frame = 0;

    constructor(io) {
        this.io = io;
        this.data = new Map();
    }

    addPlayer(id, data) {
        console.log(`User enter : ${id}`);
        buffer.set(id, Stage.center);
        const initData = { ...data, pos: Stage.center };
        this.data.set(id, initData);
    }

    updatePlayer(id, data) {
        this.data.set(id, data);
    }

    getPlayer(id) {
        return this.data.get(id);
    }

    removePlayer(id) {
        console.log(`User leave : ${id}`);
        this.data.delete(id);
    }

    update() {
        // const alivePlayerID = Object.keys(io.sockets.sockets);
        const alivePlayerID = Array.from(this.data.keys());
        if (Stage.frame % 100 === 0) {
            console.log(`Frame: ${Stage.frame}, #People: ${alivePlayerID.length}`);
        }
        alivePlayerID.forEach((id) => {
            const player = this.getPlayer(id);
            const { dx, dy, dr, theta } = buffer.getDelta(id, player.pos);
            // console.log({ id, dx, dy });
            const ratioSpeed = (dr < 10 ? dr / 10 : 1) * Stage.speed;
            const movedPos = Stage.updatePos(player.pos, ratioSpeed, theta);
            const boundedPos = Stage.limitedByBoundary(movedPos);
            const newPlayer = { ...player, pos: boundedPos };
            this.updatePlayer(id, newPlayer);
        });

        const currentData = Array.from(this.data.entries()).map(([id, data]) => ({ id, data }));
        this.io.emit("update", currentData);
        Stage.frame += 1;
    }


    static updatePos(pos, speed, theta) {
        return {
            x: pos.x + speed * Math.cos(theta),
            y: pos.y + speed * Math.sin(theta),
        };
    }

    static limitedByBoundary(pos) {
        const boundedX = Math.max(Math.min(Stage.width, pos.x), 0);
        const boundedY = Math.max(Math.min(Stage.height, pos.y), 0);
        return { x: boundedX, y: boundedY };
    }

    static calcDistance(playerID1, playerID2) {
        const { x: x1, y: y1 } = this.data.get(playerID1);
        const { x: x2, y: y2 } = this.data.get(playerID2);
        const disX = x1 - x2;
        const disY = y1 - y2;
        return Math.sqrt(Math.abs(disX * disX) + Math.abs(disY * disY));
    }
}
module.exports = { Stage };
