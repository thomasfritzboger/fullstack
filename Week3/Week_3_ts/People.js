"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeople = void 0;
const people_json_1 = __importDefault(require("./people.json"));
const Person_1 = require("./Person");
console.log(people_json_1.default);
function getPeople() {
    const people = [];
    people_json_1.default.forEach(person => {
        people.push(new Person_1.Person(person.name, person.age, person.occupation, person.salary));
    });
    console.log(people);
    return Promise.resolve(people);
}
exports.getPeople = getPeople;
