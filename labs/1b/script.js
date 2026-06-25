//Q1
function sumDiagonals(arr, row, col) {
    let sum = 0;

    let diagonals = [
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row + 1, col + 1],
    ];

    for (let [r, c] of diagonals) {
        if (r >= 0 && r < arr.length && c >= 0 && c < arr[0].length) {
        sum += arr[r][c];
        }
    }

    return sum;
}

//let arr = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
//sumDiagonals(arr, 1, 2)
//sumDiagonals(arr, 0, 0)

//Q2
function copyInc(arr) {}
