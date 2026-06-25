//Q1
function sumDiagonals(arr, row, col) {
    let sum = 0;
    let diagonals = [];

    if (row >= 0 && row < arr.length && col >= 0 && 
        col < arr[0].length) { 
        continue;
        } else {
        return(console.log("Out of bounds"));
    }
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

let arr = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
sumDiagonals(arr, 4, 2)
//sumDiagonals(arr, 0, 0)

//Q2
function copyInc(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        result[i] = [];
        for (let j = 0; j < arr[i].length; j++) {
            result[i][j] = arr[i][j] + 1;
        }
    }

    return result;
}

//console.log(copyInc([[1,2,3],[4,5,6],[7,8,9]]));

//Q3
let obj = {
    999: null,
    a: 1,
    b: {
        xyz: "abc",
        foobar: {
            hello_world: [1, 2, 3],
        },
    },
    c: "def",
};

function isLiteralObj(x) {
    return (!!x) && (x.constructor === Object);
}

function deepObjPrint(obj, indent = 0) {
    let spaces = " ".repeat(indent);

    for (let [key, value] of Object.entries(obj)) {
        if (isLiteralObj(value)) {
            console.log(`${spaces}${key}: {`);
            deepObjPrint(value, indent + 2);
            console.log(`${spaces}}`);
        } else {
            console.log(`${spaces}${key}: ${value}`);
        }
    }
}

deepObjPrint(obj);