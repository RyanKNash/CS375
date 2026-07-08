function countLiveNeighbors(board, row, col) {
  let count = 0;

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r === row && c === col) continue;

      if (
        r >= 0 &&
        r < board.length &&
        c >= 0 &&
        c < board[row].length &&
        board[r][c] === true
      ) {
        count++;
      }
    }
  }

  return count;
}

function stepBoard(board) {
  if (board.length === 0 || board[0].length === 0) {
    return board;
  }

  let nextBoard = [];

  for (let r = 0; r < board.length; r++) {
    let newRow = [];

    for (let c = 0; c < board[r].length; c++) {
      let liveNeighbors = countLiveNeighbors(board, r, c);

      if (board[r][c] === true) {
        newRow.push(liveNeighbors === 2 || liveNeighbors === 3);
      } else {
        newRow.push(liveNeighbors === 3);
      }
    }

    nextBoard.push(newRow);
  }

  return nextBoard;
}
