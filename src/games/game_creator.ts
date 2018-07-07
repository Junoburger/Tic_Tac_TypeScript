export const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;

const existingColors = ["blue", "red", "green", "magenta", "yellow"];

export const randomColor = () => {
  return existingColors[Math.floor(Math.random() * existingColors.length)];
};

export const validColor = newColor => {
  if (existingColors.indexOf(newColor)) return newColor;
};

export const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];
