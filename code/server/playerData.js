class PlayerData {
    constructor() {
        this.data = new Map();
    }

    setPos(playerID, pos) {
        this.data.set(playerID, pos);
    }

    getPos(playerID) {
        return this.data.get(playerID);
    }

    getAllPos() {
        return Array.from this.data.entries;
    }

    calcDistance(playerID1, playerID2) {
        const { x: x1, y: y1 } = this.data.get(playerID1);
        const { x: x2, y: y2 } = this.data.get(playerID2);
        const disX = x1 - x2;
        const disY = y1 - y2;
        return Math.sqrt(Math.abs(disX * disX) + Math.abs(disY * disY));
    }

    addPlayer() {
        //
    }

    removePlayer() {
        //
    }
}

module.exports = { PlayerData };
