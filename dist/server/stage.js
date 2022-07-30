import { buffer } from "./inputBuffer";
class Stage {
    constructor(io) {
        this.io = io;
        this.data = new Map();
    }
    setPreyer(id, isPreyer) {
        if (isPreyer) {
            this.updatePlayer(id, { isPreyer: true, preyerStartDate: Date.now() });
        }
        else {
            this.updatePlayer(id, { isPreyer: false, preyerStartDate: null });
        }
    }
    addPlayer(id, data) {
        console.log(`User enter : ${id}`);
        buffer.set(id, Stage.center);
        const playerInfo = { ...data, id, pos: Stage.center, isPreyer: false, preyerStartDate: null };
        this.data.set(id, playerInfo);
        const amIAlone = this.data.size === 0;
        this.setPreyer(id, amIAlone);
    }
    updatePlayer(id, data) {
        this.data.set(id, { ...this.getPlayer(id), ...data });
    }
    getPlayer(id) {
        return this.data.get(id) || null;
    }
    removePlayer(id) {
        console.log(`User leave : ${id}`);
        this.data.delete(id);
    }
    update() {
        if (this.data.size === 0) {
            return;
        }
        // const alivePlayerID = Object.keys(io.sockets.sockets);
        const alivePlayerID = Array.from(this.data.keys());
        if (Stage.frame % 100 === 0) {
            console.log(`Frame: ${Stage.frame}, #People: ${alivePlayerID.length}`);
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
        if (preyer.preyerStartDate + Stage.preyerDelayInMS < Date.now()) {
            const shortestElem = {
                player: null,
                dist: Number.POSITIVE_INFINITY,
            };
            alivePlayerID.forEach((id) => {
                if (id === preyer.id) {
                    return;
                }
                const player = this.getPlayer(id);
                console.log({ preyer, player });
                const dist = Stage.calcDistance(preyer.pos, player.pos);
                if (shortestElem.dist > dist) {
                    shortestElem.player = player;
                    shortestElem.dist = dist;
                }
            });
            if (shortestElem.dist < 17) {
                this.setPreyer(preyer.id, false);
                this.setPreyer(shortestElem.player.id, true);
                // this.updatePlayer(preyer.id, { isPreyer: false });
                // this.updatePlayer(shortestElem.player.id, { isPreyer: true });
            }
        }
        const socketData = Array.from(this.data.values());
        this.io.emit("update", socketData);
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
    static calcDistance(pos1, pos2) {
        const { x: x1, y: y1 } = pos1;
        const { x: x2, y: y2 } = pos2;
        const disX = x1 - x2;
        const disY = y1 - y2;
        return Math.sqrt(Math.abs(disX * disX) + Math.abs(disY * disY));
    }
}
Stage.width = 500;
Stage.height = 500;
Stage.center = { x: Stage.width / 2, y: Stage.height / 2 };
Stage.speed = 7;
Stage.speedRange = 10;
Stage.frame = 0;
Stage.preyerDelayInMS = 3000;
export { Stage };
//# sourceMappingURL=stage.js.map