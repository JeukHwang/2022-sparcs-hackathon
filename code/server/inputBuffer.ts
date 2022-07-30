import type { Pos } from "../util";
import { Stage } from "./stage";

type Delta = {dx:number, dy:number, dr:number, theta:number};
class InputBuffer {
    data: Map<string, Pos>;
    constructor() {
        this.data = new Map();
    }

    set(id:string, pos:Pos):void {
        this.data.set(id, pos);
    }

    get(id:string):Pos {
        if (!this.data.has(id)) {
            this.data.set(id, Stage.center);
        }
        return this.data.get(id)!;
    }

    delete(id:string):void {
        this.data.delete(id);
    }

    getDelta(id:string, pos:Pos):Delta {
        const { x, y } = this.get(id);
        const dx = x - pos.x;
        const dy = y - pos.y;
        const dr = (dx ** 2 + dy ** 2) ** 0.5;
        const theta = Math.atan2(dy, dx);
        return { dx, dy, dr, theta };
    }
}

const buffer = new InputBuffer();
export { buffer };

