import { Player } from "./player.js";

export class PlayerData {
    constructor(socket) {
        this.data = new Map();
        this.socket = socket;
    }

    addPlayer(id, def) {
        const player = new Player(def);
        this.data.set(id, player);
    }

    getPlayer(id) {
        return this.data.get(id) || null;
    }

    deletePlayer(id) {
        const player = this.getPlayer(id);
        this.data.delete(id);
        player.delete();
    }

    has(id) {
        return this.data.has(id);
    }

    getMainPlayer() {
        return this.getPlayer(this.socket.id);
    }
}
