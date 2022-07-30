import type { Socket } from "socket.io";
import { Player } from "./player";

export class PlayerData {
    data: Map<string, Player>;
    socket: Socket;
    constructor(socket:Socket) {
        this.data = new Map();
        this.socket = socket;
    }

    addPlayer(id:string, color: string):void {
        const player = new Player(color);
        this.data.set(id, player);
    }

    getPlayer(id:string):Player|null {
        return this.data.get(id) || null;
    }

    deletePlayer(id:string):void {
        const player = this.getPlayer(id);
        this.data.delete(id);
        if (player !== null) { player.delete(); }
    }

    has(id:string):boolean {
        return this.data.has(id);
    }
}
