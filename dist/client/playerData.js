import { Player } from "./player";
export class PlayerData {
    constructor(socket) {
        this.data = new Map();
        this.socket = socket;
    }
    addPlayer(id, color) {
        const player = new Player(color);
        this.data.set(id, player);
    }
    getPlayer(id) {
        return this.data.get(id) || null;
    }
    deletePlayer(id) {
        const player = this.getPlayer(id);
        this.data.delete(id);
        if (player !== null) {
            player.delete();
        }
    }
    has(id) {
        return this.data.has(id);
    }
}
