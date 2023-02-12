function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

const minus = (a,b) => a-b;

function operateOnNumbers(operator, x, y) {
    return operator(x, y);
}

const numbers = [20,40,50,60];

function squared(numbers) {
    return numbers.map((num) => num*num)
}

function divideBy10(numbers) {
    return numbers.map((num) => num/10)
}

function add3(numbers) {
    return numbers.map(num => num+3)
}

function multiPurpose(numbers, callback1, callback2) {
    numbers = callback1(numbers);
    numbers = callback2(numbers);
    return numbers;
}

console.log(operateOnNumbers(add, 3, 4));   // 7
console.log(operateOnNumbers(multiply, 3, 4));   // 12
console.log(operateOnNumbers(minus,5,4));
console.log(multiPurpose(numbers, squared, divideBy10));
console.log(multiPurpose(numbers,divideBy10,add3))

function doSomething(callback) {
    console.log("Doing something");
    callback();
}

doSomething(() =>  console.log("Callback called"));

// Function arguments
const func = (a, b, c) => {
    console.log(a, b, c);
};
const args = [0, 1, 2];
func(...args); // 0 1 2

const obj = { foo: 'bar', x: 42 };
const clonedObj = {...obj};
obj.x = 43 //Hvis der ikke bruges spread operator bliver clonedObj også ændret
console.log(clonedObj); // Object { foo: "bar", x: 42 }

class Employee{
    constructor(name, salary, hireDate) {
        this.name = name;
        this.salary = salary;
        this.hireDate = hireDate; //"01/01/2015"
    }
    toString() {
        return `Employee: ${this.name}, Salary: ${this.salary}, Hire Date: ${this.hireDate}`;
    }
}

class Manager extends Employee{
    constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged) {
        super(name, salary, hireDate)
        this.jobTitle = jobTitle;
        this.descriptionOfJob = descriptionOfJob; //"Manager of the Sales Department"
        this.employeesManaged = employeesManaged;
    }

    toString() {
        return `"${super.toString()}, 
 Job Title: ${this.jobTitle}, Description Of Job: ${this.descriptionOfJob}, Employees Managed: ${this.employeesManaged}`;
    }
}

class Department{
    constructor (departmentName, employees){
        this.departmentName = departmentName;
        this.employees = employees;
    }
    toString() {
        return ` Name: ${this.departmentName}, Employees: ${this.employees}"`; // ["Steve", "Marc"]
    }
}

class Contract {
    constructor(employee, manager, department) {
        this.employee = employee;
        this.manager = manager;
        this.department = department;
    }
    toString() {
        return `${this.manager.toString()},
${this.department.toString()}
        `;
    }
}

const steve = new Employee("Steve Taylor", 50000, "01/01/2015")
const manager = new Manager(steve.name,steve.salary,steve.hireDate,"Manager","Manager of Sales Department",2)
const department = new Department("Sales",["Steve","Marc"])
const contract = new Contract(steve,manager,department)
console.log(contract.toString());


const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let n of numbers1) {
    console.log(n)
}

for (const prop in steve) {
    console.log(`steve.${prop} = ${steve[prop]}`)
}

const calculator = (num1,num2 = 7) => num1+num2
console.log(calculator(3));

const calculatorWithRest = (...rest) => {
    let res = 0;
    for ( number of rest) {
        res += number;
    }
    return res;
}
console.log("3 numbers: "+calculatorWithRest(1,2,3))
console.log("5 numbers: "+calculatorWithRest(1,2,3,4,5))
console.log("7 numbers: "+calculatorWithRest(1,2,3,4,5,6,7))

const manager1 = new Manager("Kurt",30000,"02/02/2016","Manager", "Manager of the Sales Department", ["Steve", "Marc"]);
const {hireDate, jobTitle, descriptionOfJob} = manager1;
console.log(jobTitle)
console.log(descriptionOfJob)
console.log(hireDate)
