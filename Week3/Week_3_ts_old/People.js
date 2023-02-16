"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeople = void 0;
const people_json_1 = __importDefault(require("./people.json"));
const PersonModel_1 = require("./PersonModel");
console.log(people_json_1.default);
function getPeople() {
    const people = [];
    people_json_1.default.forEach(person => {
        people.push(new PersonModel_1.PersonModel(person.name, person.age, person.occupation, person.salary));
    });
    console.log(people);
    return Promise.resolve(people);
}
exports.getPeople = getPeople;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const people = yield getPeople();
        console.log(people);
    });
}
main();
