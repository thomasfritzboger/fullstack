const helloWorld = (name:string) => {
    return (`Hello ${name}`);
}

console.log(helloWorld("Thomas"));

document.getElementById('root')!.innerHTML = helloWorld('Thomas');

enum Gender {
    Male= "Male",
    Female= "Female"
}

class Person {
    public name: string;
    public age: number;
    readonly gender: Gender;

    constructor(name: string, age: number, gender: Gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

let persons:Person[] = []
const firstMaleNames = ["Hans","Mike","Steve","Paul","Bill"]
const firstFemaleNames = ["Julia","Sandra","Ann","Betty"]
const lastNames = ["Smith","Hannson","Weber","Gates"]


function creatPerson(number:number) {
    for (let i = 0; i < number; i++) {
        let chooseGender = Math.round(Math.random())
        let firstName:string;
        const gender = chooseGender == 0 ? Gender.Male : Gender.Female
        if (chooseGender == 0) {
            let x = Math.floor(Math.random() * firstMaleNames.length);
            firstName = firstMaleNames[x];
        } else {
            let x = Math.floor(Math.random() * firstFemaleNames.length);
            firstName = firstFemaleNames[x];
        }

        let y = Math.floor(Math.random() * lastNames.length);
        const lastName = lastNames[y];
        let age = Math.floor(Math.random() * 80 + 10)
        persons.push(new Person(firstName + ' ' + lastName, age, gender));

    }
}



function generatePersonTable(personList: Person[]): string {
    // Define the HTML table headers
    const headers: string[] = ["Name", "Age", "Gender"];

    // Define the HTML table rows
    let rows: string = "";
    for (const person of personList) {
        rows += `<tr><td>${person.name}</td><td>${person.age}</td><td>${person.gender}</td></tr>`;
    }

    // Construct the HTML table
    const table: string = `<table><thead><tr>${headers.map((header: string) => 
        `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;

    return table;
}



creatPerson(20);
persons.sort((a,b) => (a.age-b.age))

document.getElementById('root')!.innerHTML = generatePersonTable(persons);

console.log('Hej',persons)



