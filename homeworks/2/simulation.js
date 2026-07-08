const ROWS = 25;
const COLS = 25;
const STEP_DELAY = 100;

let board = makeCheckerboard();
let intervalId = null;

const boardElement = document.getElementById("board");
const stepButton = document.getElementById("step-button");
const resetButton = document.getElementById("reset-button");
const goButton = document.getElementById("go-button");
const pauseButton = document.getElementById("pause-button");
const randomButton = document.getElementById("random-button");

function makeCheckerboard() {
  let newBoard = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];

    for (let c = 0; c < COLS; c++) {
      row.push((r + c) % 2 === 0);
    }

    newBoard.push(row);
  }

  return newBoard;
}

function makeRandomBoard() {
  let newBoard = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];

    for (let c = 0; c < COLS; c++) {
      row.push(Math.random() < 0.5);
    }

    newBoard.push(row);
  }

  return newBoard;
}

function createBoardElements() {
  for (let r = 0; r < ROWS; r++) {
    let rowElement = document.createElement("tr");

    for (let c = 0; c < COLS; c++) {
      let cellElement = document.createElement("td");
      rowElement.appendChild(cellElement);
    }

    boardElement.appendChild(rowElement);
  }
}

function renderBoard() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      boardElement.rows[r].cells[c].className = board[r][c] ? "alive" : "dead";
    }
  }
}

function stepSimulation() {
  board = stepBoard(board);
  renderBoard();
}

function pauseSimulation() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

stepButton.addEventListener("click", stepSimulation);

resetButton.addEventListener("click", function () {
  pauseSimulation();
  board = makeCheckerboard();
  renderBoard();
});

goButton.addEventListener("click", function () {
  if (intervalId === null) {
    intervalId = setInterval(stepSimulation, STEP_DELAY);
  }
});

pauseButton.addEventListener("click", pauseSimulation);

randomButton.addEventListener("click", function () {
  pauseSimulation();
  board = makeRandomBoard();
  renderBoard();
});

createBoardElements();
renderBoard();
