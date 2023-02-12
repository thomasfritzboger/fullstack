function calculate(x,y,operation){
    return operation(x,y)
}

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



//console.log(calculate(4, 5, add));
//console.log(calculate(4, 5, subtract));
//console.log(calculate(4, 5, multiply));
//console.log(calculate(4, 5, divide));


