export class Player {
    constructor(stage) {
        this.stage = stage;
        this.element = document.createElement("div");
        this.element.classList.add("player");
        this.stage.appendChild(this.element);
    }

    setPos(pos) {
        console.log("setPos", pos);
        this.element.style.left = `${pos.x}px`;
        this.element.style.top = `${pos.y}px`;
    }

    hide() {
        this.element.classList.add("hidden");
    }

    show() {
        this.element.classList.remove("hidden");
    }
}
