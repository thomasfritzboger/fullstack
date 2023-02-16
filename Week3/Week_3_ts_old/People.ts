
import data from './people.json';
import { PersonModel } from './PersonModel';

console.log(data)
export function getPeople(): Promise<PersonModel[]> {
    const people: PersonModel[] = [];
    data.forEach(person => {
        people.push(new PersonModel(person.name, person.age, person.occupation, person.salary));
    });

    console.log(people)
    return Promise.resolve(people);
}

