export const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;

const validColors = ["#F00", "#00F", "#0F0", "#FF0", "#F0F"];

export const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];

export const randomColor = () => validColors[Math.floor(Math.random() * validColors.length)];

export const validColor = newColor => validColors.includes(newColor);
