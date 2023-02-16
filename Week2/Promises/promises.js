// promises.js
function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    if (y === 0) {
        throw new Error('Cannot divide by zero');
    }
    return x/y;
}

function calculate(x, y, operation) {
    return new Promise((resolve, reject) => {
        try {
            const result = operation(x,y)
            resolve(result);
        } catch (error) {
            reject(new Error(error.message +'Error: An error occurred while performing the calculation'));
        }
    });
}

// const res = calculate(3, 6, divide)
//     .then(result => {
//         console.log(`The result is: ${result}`);
//     })
//     .catch(error => console.error(error.message));


// console.log(calculate(4, 6, add));
// console.log(calculate(5,7,multiply))
// console.log(calculate(88,16,subtract))
// console.log(res)

// calculate(5,5,add)
//     .then(res => {
//         console.log('adding: ' + res)
//         calculate(10, 5, subtract)
//             .then(res => {
//                 console.log('subtracting ' + res)
//                 calculate(6, 8, multiply)
//                     .then(res => {
//                         console.log(res)
//                         calculate(25, 5, divide)
//                             .then(res => {
//                                 console.log(res)
//                             })
//                     })
//             })
//     })

const calculatePro = async (a,b,operation) => {
    try {
        data = await operation(a,b)
        return data
   } catch (e) {
         throw new Error(e.message)
         console.log(e)
    }
}

calculatePro(4, 6, add)
    .then(data => console.log(data)
);