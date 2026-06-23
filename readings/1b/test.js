
function evenIdxPositiveSum(testIn) {
    let result = 0;
    for (let i = 1;  i < testIn.length; i++) {
        if (i % 2 === 0 && testIn[i] > 0) {
            result += testIn[i];
        }
    }
    console.log(result);
    return result;
}

let arr = [-1, 2, 3, 9, -10, 4, 6];
evenIdxPositiveSum(arr);

let isEven = x => x % 2 == 0;

function filterer(list, isEven) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        if(list[i].isEven()) {
            result += list[i];
        }
    }
    console.log(result);
    
}

filterer([1, 2, 3, 4, 5, 6], isEven);