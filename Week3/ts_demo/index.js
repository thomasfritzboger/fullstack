"use strict";
const helloWorld = (name) => {
    return (`Hello ${name}`);
};
console.log(helloWorld("Thomas"));
document.getElementById('root').innerHTML = helloWorld('Thomas');
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
let persons = [];
const firstMaleNames = ["Hans", "Mike", "Steve", "Paul", "Bill"];
const firstFemaleNames = ["Julia", "Sandra", "Ann", "Betty"];
const lastNames = ["Smith", "Hannson", "Weber", "Gates"];
function creatPerson(number) {
    for (let i = 0; i < number; i++) {
        let chooseGender = Math.round(Math.random());
        let firstName;
        const gender = chooseGender == 0 ? Gender.Male : Gender.Female;
        if (chooseGender == 0) {
            let x = Math.floor(Math.random() * firstMaleNames.length);
            firstName = firstMaleNames[x];
        }
        else {
            let x = Math.floor(Math.random() * firstFemaleNames.length);
            firstName = firstFemaleNames[x];
        }
        let y = Math.floor(Math.random() * lastNames.length);
        const lastName = lastNames[y];
        let age = Math.floor(Math.random() * 80 + 10);
        persons.push(new Person(firstName + ' ' + lastName, age, gender));
    }
}
function generatePersonTable(personList) {
    // Define the HTML table headers
    const headers = ["Name", "Age", "Gender"];
    // Define the HTML table rows
    let rows = "";
    for (const person of personList) {
        rows += `<tr><td>${person.name}</td><td>${person.age}</td><td>${person.gender}</td></tr>`;
    }
    // Construct the HTML table
    const table = `<table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
    return table;
}
creatPerson(20);
persons.sort((a, b) => (a.age - b.age));
document.getElementById('root').innerHTML = generatePersonTable(persons);
console.log('Hej', persons);
