export class Player {
    static stage = document.getElementById("stage");

    constructor(def) {
        this.def = def; // name, color
        this.element = document.createElement("div");
        this.element.classList.add("player");
        this.element.style.backgroundColor = def.color;
        console.log(def.color);
        Player.stage.appendChild(this.element);
    }

    move(pos) {
        if (pos !== null) {
            this.show();
            this.setPos(pos);
        } else {
            this.hide();
        }
    }

    setPos(pos) {
        // console.log("setPos", pos);
        this.element.style.left = `${pos.x}px`;
        this.element.style.top = `${pos.y}px`;
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
