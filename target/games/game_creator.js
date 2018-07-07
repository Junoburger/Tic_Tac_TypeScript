"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;
const existingColors = ["blue", "red", "green", "magenta", "yellow"];
exports.randomColor = () => {
    return existingColors[Math.floor(Math.random() * existingColors.length)];
};
exports.validColor = newColor => {
    if (existingColors.includes(newColor))
        return newColor;
};
exports.defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];
//# sourceMappingURL=game_creator.js.map