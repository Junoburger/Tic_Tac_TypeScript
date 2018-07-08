"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;
const validColors = ["#F00", "#00F", "#0F0", "#FF0", "#F0F"];
exports.defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];
exports.randomColor = () => validColors[Math.floor(Math.random() * validColors.length)];
exports.validColor = newColor => validColors.includes(newColor);
//# sourceMappingURL=game_creator.js.map