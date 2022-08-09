const Player = (sign, moves) => {
  this.sign = sign;

  moves = [];

  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gameBoard = (() => {
  const gameboard = [];

  const BOARD_SIZE = 9;

  const gametable = document.querySelector("#game-table");

  const renderTable = () => {
    function addCellListener(e) {
      gameboard[+e.target.dataset.index] = "X";
      e.target.innerText = gameController.makeMove();
      gameController.changeTurn();
    }

    for (let x = 0; x < BOARD_SIZE; x++) {
      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");
      gameboard.push("");
      gameCell.setAttribute("data-index", x);
      gameCell.addEventListener("click", addCellListener);
      gametable.append(gameCell);
    }
  };

  return { renderTable, gameboard };
})();

const gameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");

  let turn = 1;
  let isOver = false;

  function changeTurn() {
    turn++;
  }

  function makeMove() {
    return turn % 2 == 0 ? "X" : "O";
  }

  function checkWin(sign) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const playerMoves = [];

    gameBoard.gameboard.forEach((cell, index) =>
      cell === sign ? playerMoves.push(index) : console.log("Not a match")
    );

    // winConditions.forEach((conditon) => conditon.includes(...playerMoves));
  }

  return { checkWin, changeTurn, makeMove };
})();

gameBoard.renderTable();
