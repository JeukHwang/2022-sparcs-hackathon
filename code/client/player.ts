import type { Pos } from "../util";

export class Player {
    static stage = document.getElementById("stage") as HTMLDivElement;
    element: HTMLDivElement;
    constructor(color: string) {
        this.element = document.createElement("div");
        this.element.classList.add("player");
        this.element.style.backgroundColor = color;
        Player.stage.appendChild(this.element);
    }

    move(pos:Pos) {
        if (pos !== null) {
            this.show();
            this.setPos(pos);
        } else {
            this.hide();
        }
    }

    setPos(pos:Pos) {
        // console.log("setPos", pos);
        this.element.style.left = `${pos.x}px`;
        this.element.style.top = `${pos.y}px`;
    }

    setPreyer(isPreyer:boolean) {
        this.element.classList[isPreyer ? "add" : "remove"]("preyer");
    }

    hide() {
        this.element.classList.add("hidden");
    }

    show() {
        this.element.classList.remove("hidden");
    }

    delete() {
        this.hide();
        this.element.remove();
    }
}
