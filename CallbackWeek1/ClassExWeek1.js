// Higher order funktion der returnerer en funktion

function createMultiplier(y) {
    return x => x*y;
}

const timesTwo = createMultiplier(2);
const timesThree = createMultiplier(3);
const timesFour = createMultiplier(4);

console.log(timesTwo(9))
console.log(timesThree(4))
console.log(timesFour(7))

//Callbacks

const numbers = [9,7,3,5,6,10,12];
const squared = numbers.map(x => x**2)
console.log(squared)

// 1 Create a function
// 2 Create a new array, that will be returned
// 3 Loop through the array
// 4 For each element, call the function

function map(array, mapFunction) {
    const mapArray = [];
    for (let i = 0; i<array.length; i++) {
        const result = mapFunction(array[i], i, array);
        mapArray.push(result);
    }
    return mapArray;
}

const times2 = map(numbers, (x) => x*2);
console.log(times2);

const even = numbers.filter(x=>x%2==0);
console.log(even);

//filter((element, index, array) => { /* … */ })
function filter(array, filterFunction) {
    const filterArray = [];
    for (let i = 0; i < array.length; i++) {

        //Shorthand
        filterFunction(array[i],i) && filterArray.push(array[i])

        //Samme
        // const res = filterFunction(array[i], i, array);
        // if (res) {
        //     filterArray.push(array[i])
        // }
    }
    return filterArray;
}

const oddNumbers = filter(numbers,x => x%2 !== 0);
console.log(oddNumbers)

// Reduce

const reduce = (array, reduceFunction, initilaValue) => {
    let sum = initilaValue;
    for (let i = 0; i < array.length; i++) {
        sum = reduceFunction(sum, array[i])
    }
    return sum;
}

const sum = reduce(numbers,(sum, num) => sum + num,0)
const multiply = reduce(numbers,(sum,num)=>sum*num,1)
console.log(sum)
console.log(multiply)