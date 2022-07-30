export class Mouse {
    constructor(stage) {
        this.stage = stage;
        this.pos = null; // {x: number, y: number} || null
        // this.stage.addEventListener("mouseenter", this.mouseEnter.bind(this));
        // this.stage.addEventListener("mousemove", this.mouseMove.bind(this));
        // this.stage.addEventListener("mouseleave", this.mouseLeave.bind(this));
        document.addEventListener("mouseenter", this.mouseEnter.bind(this));
        document.addEventListener("mousemove", this.mouseMove.bind(this));
        document.addEventListener("mouseleave", this.mouseLeave.bind(this));
    }

    mouseEnter(event) {
        const rect = this.stage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.pos = { x, y };
    }

    mouseMove(event) {
        const rect = this.stage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.pos = { x, y };
    }

    mouseLeave(event) {
        this.pos = null;
    }
}
