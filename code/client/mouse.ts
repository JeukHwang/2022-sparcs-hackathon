import type { Pos } from "../util";

export class Mouse {
    stage: HTMLDivElement;
    pos: Pos|null;
    constructor(stage:HTMLDivElement) {
        this.stage = stage;
        this.pos = null; // {x: number, y: number} || null
        // this.stage.addEventListener("mouseenter", this.mouseEnter.bind(this));
        // this.stage.addEventListener("mousemove", this.mouseMove.bind(this));
        // this.stage.addEventListener("mouseleave", this.mouseLeave.bind(this));
        document.addEventListener("mouseenter", this.mouseEnter.bind(this));
        document.addEventListener("mousemove", this.mouseMove.bind(this));
        document.addEventListener("mouseleave", this.mouseLeave.bind(this));
    }

    mouseEnter(event:MouseEvent) {
        // console.log("enter");
        const rect = this.stage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.pos = { x, y };
    }

    mouseMove(event:MouseEvent) {
        // console.log("move");
        const rect = this.stage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.pos = { x, y };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mouseLeave(_event:MouseEvent) {
        // console.log("leave");
        this.pos = null;
    }
}
