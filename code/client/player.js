export class Player {
    static stage = document.getElementById("stage");

    constructor(color) {
        this.color = color;
        this.element = document.createElement("div");
        this.element.classList.add("player");
        this.element.style.backgroundColor = this.color;
        Player.stage.appendChild(this.element);
        this.img = null;
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
        this.element.style.left = `${pos.x}px`;
        this.element.style.top = `${pos.y}px`;
    }

    setPreyer(isPreyer) {
        this.element.classList[isPreyer ? "add" : "remove"]("preyer");
        if (isPreyer && this.img === null) {
            this.img = document.createElement("img");
            this.img.src = "../../test/Symbol.svg";
            this.element.appendChild(this.img);
            this.element.style.backgroundColor = "black";
        } else if (!isPreyer && this.img !== null) {
            this.img.remove();
            this.img = null;
            this.element.style.backgroundColor = this.color;
        }
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
