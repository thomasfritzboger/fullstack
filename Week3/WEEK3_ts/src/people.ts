
import data from './people.json';
import { Person } from './Person';


export function getPeople(): Promise<Person[]> {
    const people: Person[] = [];
    data.forEach(person => {
        people.push(new Person(person.name, person.age, person.occupation, person.salary));
    });
    return Promise.resolve(people);
}

