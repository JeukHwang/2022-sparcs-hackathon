const { Players } = require("../../models");

async function createPlayer(nickname, password, score) {
    const player = await Players.create({ nickname, password, score });
    return player;
}

async function findPlayer(nickname) {
    const player = await Players.findAll({ where: { nickname } });
    return player;
}

async function updatePlayer(nickname, password, score) {
    await Players.update({ password, score }, { where: { nickname } });
}

async function getAllScore() {
    const nameScore = await Players.findAll({ attributes: ["nickname", "score"] });
    return nameScore;
}

module.exports = { createPlayer, findPlayer, updatePlayer, getAllScore };
