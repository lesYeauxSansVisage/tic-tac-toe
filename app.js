const Player = (sign, moves) => {
  this.sign = sign;

  moves = [];

  const getSign = () => {
    return sign;
  };

  return { getSign, moves };
};

const aiPlayer = (() => {
  function getEmptyFields() {
    const validFieldIndex = [];
    gameBoard.gameboard.forEach(
      (el, index) => el === "" && validFieldIndex.push(index)
    );

    return validFieldIndex;
  }

  function aiMove() {
    const validMoves = getEmptyFields();

    const randomIndex = Math.floor(Math.random() * validMoves.length);

    return validMoves[randomIndex];
  }

  const moves = [];

  function getSign() {
    return "O";
  }

  return { aiMove, getSign, moves };
})();

const gameBoard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  const BOARD_SIZE = 9;

  const gametable = document.querySelector("#game-table");

  const renderTable = () => {
    gametable.innerHTML = "";

    for (let x = 0; x < BOARD_SIZE; x++) {
      gameboard[x] = "";
      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");
      gameCell.setAttribute("data-index", x);
      gameCell.addEventListener("click", addCellListener);
      gametable.append(gameCell);
    }

    function addCellListener(e) {
      const currentCell = +e.target.dataset.index;
      if (gameboard[currentCell] === "") {
        const currentMove = gameController.makeMove(currentCell);
        gameboard[currentCell] = currentMove;
        e.target.innerText = currentMove;
        gameController.checkWin();
        gameController.changeTurn();
      }
    }
  };

  return { renderTable, gameboard };
})();

const gameController = (() => {
  const player1 = Player("X");
  const player2 = aiPlayer;

  let turn = 1;
  let isOver = false;

  let currentPlayer = player1;

  function changeTurn() {
    currentPlayer = turn % 2 === 0 ? player1 : player2;

    if (!currentPlayer % 2 === 0) {
      makeMove(aiPlayer.aiMove());
    }

    displayController.changeMessage(currentPlayer);

    turn += 1;
  }

  function makeMove(position) {
    currentPlayer.moves.push(position);

    return currentPlayer.getSign();
  }

  function checkWin() {
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

    for (let x = 0; x < winConditions.length; x++) {
      if (
        winConditions[x].every((move) => currentPlayer.moves.includes(move))
      ) {
        isOver = true;
        showWinner();
      }
    }
    showWinner();
  }

  function showWinner() {
    if (isOver) {
      displayController.showMessage(`Player ${currentPlayer.getSign()} won!`);
      reset();
    }

    if (!gameBoard.gameboard.some((el) => el === "")) {
      displayController.showMessage("It's a draw!");
      reset();
    }
  }

  function reset() {
    turn = 0;
    currentPlayer = player1;
    player1.moves = [];
    player2.moves = [];
    displayController.changeMessage(player1);

    isOver = false;
    gameBoard.renderTable();
  }

  return { checkWin, changeTurn, makeMove, reset };
})();

const displayController = (() => {
  (function startGame() {
    const startBtn = document.querySelector("#start");

    startBtn.addEventListener("click", () => {
      startBtn.parentElement.classList.add("up");
      gameBoard.renderTable();
    });
  })();

  function changeMessage(currentPlayer) {
    const message = document.querySelector("#message-span");
    message.innerText = currentPlayer.getSign();
  }

  function showMessage(message) {
    const finalMessage = document.querySelector("#final-message");
    finalMessage.parentElement.classList.add("show");
    finalMessage.innerText = message;

    setTimeout(() => {
      finalMessage.parentElement.classList.remove("show");
    }, 3000);
  }

  (() => {
    const resetBtn = document.querySelector("#reset");

    resetBtn.addEventListener("click", gameController.reset);
  })();

  return { changeMessage, showMessage };
})();
