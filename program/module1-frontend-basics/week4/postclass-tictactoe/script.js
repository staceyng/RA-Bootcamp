const defaultBoard = [
  [
    { val: 8, player: "" },
    { val: 1, player: "" },
    { val: 6, player: "" },
  ],
  [
    { val: 3, player: "" },
    { val: 5, player: "" },
    { val: 7, player: "" },
  ],
  [
    { val: 4, player: "" },
    { val: 9, player: "" },
    { val: 2, player: "" },
  ],
];
let board = JSON.parse(JSON.stringify(defaultBoard)); // deep copy so default board doesnt change
let boardElement;
let boardContainer;
let currentPlayer = "X";
let playerXScore = false;
let playerOScore = false;
// let mode = ["2-player", "ai"];
let drawCount = 0;
let xWinCount = 0;
let oWinCount = 0;
let playerWon = false;
let allFilled = false;
let gameStarted = false;
let aiEnabled = false;

///////////////////////
// helper functions //
/////////////////////
const buildBoard = (board) => {
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  for (let i = 0; i < board.length; i += 1) {
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let j = 0; j < row.length; j += 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.innerHTML = board[i][j].player;
      if (board[i][j].player.length !== 0) {
        square.id = board[i][j].player === "X" ? "x-square" : "o-square";
      }

      rowElement.appendChild(square);

      // eslint-disable-next-line
      if (!playerWon) {
        square.addEventListener("click", () => {
          squareClick(i, j);
        });
      }
    }

    boardContainer.appendChild(rowElement);
  }
};

const threeSumCheck = (arr) => {
  // check which player arr can add to 15
  if (arr.length < 3) {
    return false;
  }

  let lp = 0;
  let rp = arr.length - 1;
  const target = 15;
  arr.sort();
  for (let i = 0; i < arr.length; i += 1) {
    lp = i + 1;
    while (lp < rp) {
      const val = arr[i] + arr[lp] + arr[rp];
      if (val < target) {
        // move lp
        lp += 1;
      } else if (val > target) {
        // move rp
        rp -= 1;
      } else {
        // found target
        return true;
      }
    }
  }
  return false;
};

/////////////////
// game logic //
///////////////

const updateScoreHeader = () => {
  playerOcontainer = document.getElementById("o-wins");
  playerXcontainer = document.getElementById("x-wins");
  drawContainer = document.getElementById("draw");

  playerOcontainer.innerHTML = `O </br> ${oWinCount} wins`;
  playerXcontainer.innerHTML = `X </br> ${xWinCount} wins`;
  drawContainer.innerHTML = `Draw </br> ${drawCount} draws`;
};

const evaluateWhichPlayer = () => {
  let outcome = "";
  if (playerOScore) {
    oWinCount += 1;
    outcome = "O wins";
    playerWon = true;
  }

  if (playerXScore) {
    xWinCount += 1;
    outcome = "X wins";
    playerWon = true;
  }

  if (allFilled) {
    drawCount += 1;
    outcome = "It's a Draw";
  }
  outputContainer = document.getElementById("output");
  outputContainer.innerHTML = outcome;
};

const checkWin = () => {
  // read board and calculate player score
  // double for loop if read by board, to be optimised, use obj?
  let countX = 0;
  let countO = 0;
  let arrX = [];
  let arrO = [];
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      switch (true) {
        case board[i][j].player === "X":
          arrX.push(board[i][j].val);
          countX += 1;
          break;
        case board[i][j].player === "O":
          arrO.push(board[i][j].val);
          countO += 1;
          break;
        default:
          continue;
      }
    }
  }

  if (countX + countO === 9) {
    allFilled = true;
  }
  playerOScore = threeSumCheck(arrO);
  playerXScore = threeSumCheck(arrX);
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer == "O" && aiEnabled) {
    setTimeout(() => {
      aiChoice();
      buildBoard(board);
    }, 1000);
  }
  if (!playerWon && !allFilled) {
    outputContainer = document.getElementById("output");
    outputContainer.innerHTML = `Player ${currentPlayer}'s turn to select`;
  }
};
const checkboxAI = () => {
  var checkBox = document.getElementById("checkbox");
  var output = document.getElementById("output");

  // If the checkbox is checked, display the output text
  if (!gameStarted) {
    if (checkBox.checked == true) {
      output.innerHTML = "Play with AI enabled";
      setTimeout(
        () => (output.innerHTML = "You are Player X, click to start"),
        2000
      );
      aiEnabled = true;
    } else {
      output.innerHTML = "Play with Player2";
      setTimeout(
        () => (output.innerHTML = "You are Player X, click to start"),
        2000
      );
    }
  }
};

const squareClick = (column, row) => {
  gameStarted = true;
  document.getElementById("checkbox").disabled = true;
  if (!aiEnabled) {
    if (board[column][row].player === "") {
      console.log("player x click");
      board[column][row].player = currentPlayer;
      checkWin();
      evaluateWhichPlayer();
      updateScoreHeader();
      togglePlayer();
    }
  } else {
    if (currentPlayer == "X") {
      if (board[column][row].player === "") {
        console.log("player x click");
        board[column][row].player = currentPlayer;
        checkWin();
        evaluateWhichPlayer();
        updateScoreHeader();
        togglePlayer();
      }
    }
  }

  buildBoard(board);
};

const onResetClick = () => {
  // reset states
  currentPlayer = "X";
  playerXScore = false;
  playerOScore = false;
  playerWon = false;
  allFilled = false;
  gameStarted = false;
  document.getElementById("checkbox").disabled = false;

  //reset board
  board = JSON.parse(JSON.stringify(defaultBoard));
  buildBoard(board);
};

const aiChoice = () => {
  // choose random cell from board if cell is unoccupied
  let r = Math.floor(Math.random() * 3);
  let c = Math.floor(Math.random() * 3);
  let notfoundEmpty = true;

  while (notfoundEmpty) {
    if (board[r][c].player.length != 0) {
      r = Math.floor(Math.random() * 3);
      c = Math.floor(Math.random() * 3);
    } else {
      console.log(`found empty, assigning to r${r}c${c}`);
      board[r][c].player = "O";
      notfoundEmpty = false;
      checkWin();
      evaluateWhichPlayer();
      updateScoreHeader();
      togglePlayer();
    }
  }
};

const initGame = () => {
  scoreContainer = document.createElement("div");
  scoreContainer.className = "score";
  scoreContainer.id = "score";

  playerOcontainer = document.createElement("div");
  playerOcontainer.className = "o-wins";
  playerOcontainer.id = "o-wins";
  playerOcontainer.innerHTML = `O </br> ${oWinCount} wins`;

  playerXcontainer = document.createElement("div");
  playerXcontainer.className = "x-wins";
  playerXcontainer.id = "x-wins";
  playerXcontainer.innerHTML = `X </br> ${xWinCount} wins`;

  drawContainer = document.createElement("div");
  drawContainer.className = "draw";
  drawContainer.id = "draw";
  drawContainer.innerHTML = `Draw </br> ${drawCount} draws`;

  scoreHeaderNodes = [playerOcontainer, playerXcontainer, drawContainer];
  for (let i = 0; i < scoreHeaderNodes.length; i += 1) {
    scoreContainer.appendChild(scoreHeaderNodes[i]);
  }

  document.body.appendChild(scoreContainer);

  boardContainer = document.createElement("div");
  boardContainer.className = "board";
  document.body.appendChild(boardContainer);
  buildBoard(board);

  outputContainer = document.createElement("div");
  outputContainer.id = "output";
  outputContainer.className = "output";
  outputContainer.innerHTML =
    "You are X, click to start playing with Player2 or select mode";
  document.body.appendChild(outputContainer);

  resetBtn = document.createElement("BUTTON");
  resetBtn.className = "reset-btn";
  resetBtn.id = "reset-btn";
  resetBtn.innerHTML = "RESET";
  resetBtn.addEventListener("click", onResetClick);
  document.body.appendChild(resetBtn);
};

initGame();
