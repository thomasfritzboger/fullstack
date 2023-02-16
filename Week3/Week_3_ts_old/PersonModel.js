"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class PersonModel {
    constructor(name, age, occupation, salary = 0) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.salary = salary;
    }
    introduce() {
        return `Hello, my name is ${this.name} and I am a ${this.occupation}. I earn ${this.salary}$`;
    }
    incrementAge() {
        this.age++;
    }
    setSalary(salary) {
        this.salary = salary;
    }
    getSalary() {
        return this.salary;
    }
}
exports.Person = PersonModel;
// const me = new PersonModel("Thomas",54, "Student")
// console.log(me.introduce())
//
// document.getElementById("root")!.innerHTML = me.name
// console.log(me.age);
// me.incrementAge()
// console.log(me.age);
// me.setSalary(1000)
// console.log(me.getSalary())
// console.log(me.introduce())
