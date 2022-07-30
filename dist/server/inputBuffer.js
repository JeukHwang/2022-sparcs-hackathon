import { Stage } from "./stage";
class InputBuffer {
    constructor() {
        this.data = new Map();
    }
    set(id, pos) {
        this.data.set(id, pos);
    }
    get(id) {
        if (!this.data.has(id)) {
            this.data.set(id, Stage.center);
        }
        return this.data.get(id);
    }
    delete(id) {
        this.data.delete(id);
    }
    getDelta(id, pos) {
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
