let firstColumn = document.getElementById("column1");
let secondColumn = document.getElementById("column2");
let thirdColumn = document.getElementById("column3");
let fourthColumn = document.getElementById("column4");
let fifthColumn = document.getElementById("column5");
let sixthColumn = document.getElementById("column6");
let seventhColumn = document.getElementById("column7");
let gameOver = document.getElementById("game")

let boardLayout = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function checkVertical(board) {
  for (let row = 0; row < board.length - 3; row++) {
    let tempRow = board[row];
    for (let space = 0; space < tempRow.length; space++) {
      let piece = board[row][space];
      if (piece === null) {
        continue;
      } else {
        if (
          piece === board[row + 1][space] &&
          piece === board[row + 2][space] &&
          piece === board[row + 3][space]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkHorizontal(board) {
  for (let row = 0; row < board.length; row++) {
    let tempRow = board[row];
    for (let space = 0; space < tempRow.length - 3; space++) {
      let piece = board[row][space];
      if (piece === null) {
        continue;
      } else {
        if (
          piece === board[row][space + 1] &&
          piece === board[row][space + 2] &&
          piece === board[row][space + 3]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDiagonalUp(board) {
  for (let row = 0; row < board.length - 3; row++) {
    let tempRow = board[row];
    for (let space = 0; space < tempRow.length - 3; space++) {
      let piece = board[row][space];
      if (piece === null) {
        continue;
      } else if (
        piece === board[row + 1][space + 1] &&
        piece === board[row + 2][space + 2] &&
        piece === board[row + 3][space + 3]
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonalDown(board) {
  for (let row = 0; row < board.length - 3; row++) {
    let tempRow = board[row];
    for (let space = 3; space < tempRow.length; space++) {
      let piece = board[row][space];
      if (piece === null) {
        continue;
      } else if (
        piece === board[row + 1][space - 1] &&
        piece === board[row + 2][space - 2] &&
        piece === board[row + 3][space - 3]
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkIfTie(board) {
  for (let row = 0; row < board.length; row++) {
    let tempRow = board[row];
    for (let space = 0; space < tempRow.length; space++) {
      let piece = board[row][space];
      if (piece === null) {
        return false;
      }
    }
  }
  return true;
}

function analyzeBoard(board) {
  if (checkHorizontal(board)) {
    return true;
  } else if (checkVertical(board)) {
    return true;
  } else if (checkDiagonalUp(board)) {
    return true;
  } else if (checkDiagonalDown(board)) {
    return true;
  }
  return false;
}

function getColumnChild(column) {
  if (column === 1) {
    return firstColumn;
  } else if (column === 2) {
    return secondColumn;
  } else if (column === 3) {
    return thirdColumn;
  } else if (column === 4) {
    return fourthColumn;
  } else if (column === 5) {
    return fifthColumn;
  } else if (column === 6) {
    return sixthColumn;
  } else if (column === 7) {
    return seventhColumn;
  }
}

let currentPlayer = 1;

function dropChip(column) {
  let targetColumn = column - 1;
  if (boardLayout[0][targetColumn] === null && !analyzeBoard(boardLayout)) {
    let targetRow;
    for (let i = 5; i >= 0; i--) {
      if (boardLayout[i][targetColumn] === null) {
        targetRow = i;
        break;
      }
    }
    let currentColumn = getColumnChild(column);
    if (currentPlayer === 1) {
      document.querySelector(".current-player").textContent =
        "Current Player: Player 2";
      currentColumn.childNodes[2 * targetRow + 1].className = "red-chip";
      boardLayout[targetRow][targetColumn] = currentPlayer;
      if (analyzeBoard(boardLayout)) {
        gameOver.classList.add("show")
        let result = document.querySelector(".result");
        result.textContent = "Player 1 wins!";
      } else {
        currentPlayer = 2;
      }
    } else if (currentPlayer === 2) {
      document.querySelector(".current-player").textContent =
        "Current Player: Player 1";
      currentColumn.childNodes[2 * targetRow + 1].className = "black-chip";
      boardLayout[targetRow][targetColumn] = currentPlayer;
      if (analyzeBoard(boardLayout)) {
        gameOver.classList.add("show")
        let result = document.querySelector(".result");
        result.textContent = "Player 2 wins!";
      } else if (checkIfTie(boardLayout)) {
        gameOver.classList.add("show")
        let result = document.querySelector(".result");
        result.textContent = "Its a tie!";
      } else {
        currentPlayer = 1;
      }
    }
  }
}

firstColumn.addEventListener("click", function () {
  dropChip(1);
});
secondColumn.addEventListener("click", function () {
  dropChip(2);
});
thirdColumn.addEventListener("click", function () {
  dropChip(3);
});
fourthColumn.addEventListener("click", function () {
  dropChip(4);
});
fifthColumn.addEventListener("click", function () {
  dropChip(5);
});
sixthColumn.addEventListener("click", function () {
  dropChip(6);
});
seventhColumn.addEventListener("click", function () {
  dropChip(7);
});


function reset() {
  startGame()
  gameOver.classList.remove("show")
}




