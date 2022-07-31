const { buffer } = require("./inputBuffer");

class Stage {
    static width = 500;
    static height = 500;
    static center = { x: Stage.width / 2, y: Stage.height / 2 };
    static speed = 7;
    static speedRange = 10;
    static frame = 0;
    static preyerDelayInMS = 1500;
    static timebuffer = 0;

    constructor(io) {
        this.io = io;
        this.data = new Map();
    }

    setPreyer(id, isPreyer) {
        const player = this.getPlayer(id);
        const wasPreyer = player.isPreyer;
        if (!wasPreyer && isPreyer) {
            this.updatePlayer(id, { isPreyer: true, preyerStartDate: Date.now() });
        } else if (wasPreyer && !isPreyer) {
            const dt = Date.now() - this.timebuffer;
            this.timebuffer = Date.now();
            this.updatePlayer(id, { isPreyer: false, preyerStartDate: null, howLongPreyer: player.howLongPreyer + dt });
        }
    }

    addPlayer(id, data) {
        console.log(`User enter : ${id}`);
        buffer.set(id, Stage.center);
        const playerInfo = { ...data, id, pos: Stage.center, isPreyer: false, preyerStartDate: null, howLongPreyer: 0 };
        this.data.set(id, playerInfo);
        // const amIAlone = this.data.size === 1;
        // this.setPreyer(id, amIAlone);
    }

    updatePlayer(id, data) {
        this.data.set(id, { ...this.getPlayer(id), ...data });
    }

    getPlayer(id) {
        return this.data.get(id) || null;
    }

    removePlayer(id) {
        console.log("Before remove", this.data, Array.from(this.data.entries()));
        const player = this.getPlayer(id);
        console.log(`User leave : ${id}`, player);
        if (player.isPreyer) {
            console.log("Remove start");
            const aliveIDs = Array.from(this.data.keys());
            const randomID = aliveIDs[Math.floor(Math.random() * aliveIDs.length)];
            this.setPreyer(randomID, true);
        }
        this.data.delete(id);
        console.log("Remove finish");
    }

    update() {
        if (this.data.size === 0) { return; }
        // const alivePlayerID = Object.keys(io.sockets.sockets);
        const alivePlayerID = Array.from(this.data.keys());
        if (Stage.frame % 100 === 0) {
            console.log(`Frame: ${Stage.frame}, #People: ${alivePlayerID.length}`, this.data);
        }
        alivePlayerID.forEach((id) => {
            const player = this.getPlayer(id);
            const { dr, theta } = buffer.getDelta(id, player.pos);
            const ratioSpeed = (dr < Stage.speedRange ? dr / Stage.speedRange : 1) * Stage.speed;
            const movedPos = Stage.updatePos(player.pos, ratioSpeed, theta);
            const boundedPos = Stage.limitedByBoundary(movedPos);
            this.updatePlayer(id, { pos: boundedPos });
        });

        const preyerID = alivePlayerID.find((id) => this.getPlayer(id).isPreyer);
        const preyer = this.getPlayer(preyerID);
        // console.log("Update start");
        if (preyer === null) {
            console.log(preyerID, alivePlayerID, Array.from(this.data));
        }
        if (preyer.preyerStartDate + Stage.preyerDelayInMS < Date.now()) {
            const shortestElem = { player: null, dist: Number.POSITIVE_INFINITY };
            alivePlayerID.forEach((id) => {
                if (id === preyer.id) { return; }
                const player = this.getPlayer(id);
                const dist = Stage.calcDistance(preyer.pos, player.pos);
                if (shortestElem.dist > dist) {
                    shortestElem.player = player;
                    shortestElem.dist = dist;
                }
            });
            if (shortestElem.dist < 35) {
                this.setPreyer(preyer.id, false);
                this.setPreyer(shortestElem.player.id, true);
            }
        }
        // console.log("update finish");
        const socketData = Array.from(this.data.values());
        this.io.emit("update", socketData);
        Stage.frame += 1;
    }

    over() {
        const alivePlayerID = Array.from(this.data.keys());
        alivePlayerID.forEach((id) => {
            if (this.getPlayer(id).isPreyer) {
                this.updatePlayer(id, { howLongPreyer: this.getPlayer(id).howLongPreyer + Date.now() - this.timebuffer });
            }
        });
        this.io.emit("result", { msg: this.getLongestPreyer() });
        this.resetPreyerTimer();
    }

    playerNumber() {
        return this.data.size();
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

    static calcDistance(pos1, pos2) {
        const { x: x1, y: y1 } = pos1;
        const { x: x2, y: y2 } = pos2;
        return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
    }

    resetPreyerTimer() {
        this.data.forEach((player) => {
            player.preyerStartDate = Date.now();
            player.howLongPreyer = 0;
        });
    }

    getLongestPreyer() {
        const longest = { player: null, time: Number.NEGATIVE_INFINITY };
        this.data.forEach((player, id) => {
            if (longest.time < player.howLongPreyer) {
                longest.player = player;
                longest.time = player.howLongPreyer;
            }
        });
        return longest.player;
    }
}
module.exports = { Stage };
