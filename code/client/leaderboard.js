class LeaderBoard {
    constructor(element) {
        this.element = element;
    }

    setData(data) {
        this.removeAll();
        data.forEach(({ nickname, score }) => {
            this.addOne(nickname, score);
        });
    }

    addOne(name, score) {
        const div = document.createElement("div");
        div.classList.add("block", "info-block");
        const text = document.createTextNode(name);
        div.classList.add("block");
        div.appendChild(text);
        const div2 = document.createElement("div");
        div2.classList.add("block", "info-block");
        const text2 = document.createTextNode(score);
        div2.classList.add("block");
        div2.appendChild(text2);
        this.element.appendChild(div);
        this.element.appendChild(div2);
    }

    removeAll() {
        while (this.element.lastElementChild) { this.element.removeChild(this.element.lastElementChild); }
    }
}

const element = document.getElementById("leaderboard");
export const leaderboard = new LeaderBoard(element);
