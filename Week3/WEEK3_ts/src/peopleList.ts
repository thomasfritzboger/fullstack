import {Person} from "./Person";

export function renderPeopleList(people: Person[], container: HTMLDivElement) {
    container.innerHTML = ""

    people.forEach((person: Person) => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');

        const name = document.createElement('h2');
        name.classList.add('person__name');
        name.textContent = person.name;
        personDiv.appendChild(name);

        const occupation = document.createElement('p');
        occupation.classList.add('person__occupation');
        occupation.textContent = person.occupation;
        personDiv.appendChild(occupation);

        const age = document.createElement('p');
        age.classList.add('person__age');
        age.textContent = person.age.toString();
        personDiv.appendChild(age);

        const salary = document.createElement('p');
        salary.classList.add('person__salary');
        salary.textContent = `${person.getSalary().toString()}$`;
        personDiv.appendChild(salary);

        container.appendChild(personDiv);
    });
}
