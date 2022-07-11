const Gameboard = {
  gameBoard: new Array(9),
};

console.log(Gameboard.gameBoard);

const renderBoard = (board) => {
  const gameTable = document.querySelector(".game-table");

  for (let i = 0; i < board.length; i++) {
    gameTable.innerHTML += `
      <div class="game-cell" data-cell-number="${i}">
        ${i % 2 == 0 ? "X" : "O"}
      </div>
    `;
  }
};

renderBoard(Gameboard.gameBoard);

const Player = (moves) => {
  return { moves };
};

const player1 = Player([3, 6, 9]);

console.log(player1);

const startBtn = document.querySelector("#start");
const startGamePage = document.querySelector(".start-game-page");

startBtn.addEventListener("click", () => {
  startGamePage.classList.add("up");
});
