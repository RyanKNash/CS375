//Q1
function evenIdxPositiveSum(testIn) {
    let result = 0;
    for (let i = 1;  i < testIn.length; i++) {
        if (i % 2 === 0 && testIn[i] > 0) {
            result += testIn[i];
        }
    }
    //console.log(result);
    return result;
}

//let arr = [-1, 2, 3, 9, -10, 4, 6];
//evenIdxPositiveSum(arr);


//Q2
let isEven = x => x % 2 === 0;

function filterer(list, predicate) {
    let result = [];

    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            result.push(list[i]);
        }
    }

    //console.log(result);
    return result;
}

//filterer([1, 2, 3, 4, 5, 6], isEven);

//Q3
function builder(keys, values) {
    let result = {};

    for(let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }

    //console.log(result);
    return result;
}

//let keys = ["a", "b", "c"];
//let values = [1, 2, 3];

//builder(keys, values);