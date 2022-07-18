const startBtn = document.querySelector("#start");
const startGamePage = document.querySelector(".start-game-page");
const gameCells = document.querySelectorAll(".game-cell");

const Gameboard = {
  gameBoard: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const renderBoard = (board) => {
  const gameTable = document.querySelector(".game-table");

  for (let i = 1; i <= board.length; i++) {
    gameTable.innerHTML += `
      <div class="game-cell" data-cell-number="${i}">
 
      </div>
    `;
  }
};

renderBoard(Gameboard.gameBoard);

const Player = (moves, sign) => {
  return { moves, sign };
};

startBtn.addEventListener("click", () => {
  startGamePage.classList.add("up");
});

gameCells.forEach((cell) =>
  cell.addEventListener("click", () => {
    cell.innerText = "X";
  })
);

const markCell = (player) => {
  return player.marker;
};

const playerMove = (player) => {
  player.moves.push(move);
};

// Make a function to mark a cell of the game
// Check if the cell is taken
// Save the selected move in the player array called "Moves"
