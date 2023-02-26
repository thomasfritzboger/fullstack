import React, {useEffect, useState} from 'react'
import './App.css'

//create Person class
class Person {
    public id: number;
    public name: string;
    public age: number
    public city: string

    constructor(id: number,name: string, age:number,  city: string) {
        this.name = name;
        this.id = id;
        this.age = age
        this.city = city
    }
}


function App() {
    const [name, setName] = useState<string>('Initial text')
    const [people,setPeople] = useState<Person[]>([]);
    //Find person med samme id i array og opdater
    const setPerson = (person:Person) => {
        let tempPeople = people.filter(a => a.id != person.id);
        setPeople([...tempPeople,person])
    }

    //fetch people from url
    const fetchPeople = () => {
        return fetch("http://localhost:3008/person")
            .then((response) => response.json() )
            .then(data => setPeople(data))
    }


    const createPerson = async (person: Person, callback: (data: any) => void) => {
        const options = makeOptions("POST", person);
        return await fetch("http://localhost:3008/person", options)
            .then(handleHttpErrors)
            .then((data) => callback(data));
    };

    //Useeffect fetch people
    useEffect(()=>{
        fetchPeople()
    },[])

        return (
        <div className="App">
            <OutputText someText={name}/>
            <InputText someText={name} setSomeText={setName}/>
            <PeopleViewer people={people} setPerson={setPerson}/>
            <AddNewPersonButton people={people} setPeople={setPeople}/>

            <RemoveLastPersonButton people={people} setPeople={setPeople}/>
            <SortByAgeButton people={people} setPeople={setPeople}/>
            <SortByIdButton people={people} setPeople={setPeople}/>
            <AddPersonForm people={people} setPeople={setPeople}/>
        </div>
    )
}

const InputText = ({someText, setSomeText}:
                       {someText:string, setSomeText: React.Dispatch<React.SetStateAction<string>>}) => {
    return(
        <div>
            <input id='textInput' type='text' placeholder={someText}
                   onChange={(evt) => setSomeText(evt.target.value)}/>
        </div>
    )
}

const OutputText = ({someText}:{someText:string}) => {
    return (
        <div>
            {someText}
        </div>
    )
}

const AddNewPersonButton = ({people,setPeople}:{people:Person[],setPeople: React.Dispatch<React.SetStateAction<Person[]>>}) => {

          const handleClick =  (event: React.MouseEvent<HTMLButtonElement>):void => {

                 const newPerson = new Person(people.length+1,"New Person",people.length+1,"Andeby")

                 const options = makeOptions("POST", newPerson);
                 fetch("http://localhost:3008/person", options)
                 people.push(newPerson)
                 setPeople([...people])
          }

    if (people.length > 0) {


        return <button onClick={handleClick} > Add person</button>


    } else {
        return <button onClick={()=>setPeople([...people])} > Add person</button>
    }
}

const RemoveLastPersonButton = ({people, setPeople}:{people:Person[], setPeople: React.Dispatch<React.SetStateAction<Person[]>>}) => {
    if (people.length < 1) {
        return null;
    }
    return <button onClick={
        ()=>{
            const options = makeOptions("DELETE" );
            return fetch("http://localhost:3008/person/"+people[people.length-1].id, options)
                .then(handleHttpErrors)
                .then((data) => setPeople( people.slice(0,people.length-1)));
        }

    } >Remove last Person in list</button>
}

const SortByAgeButton = ({people, setPeople}:{people:Person[], setPeople: React.Dispatch<React.SetStateAction<Person[]>>}) => {
    return <button onClick={
        () => {
            people.sort((a,b) => a.age - b.age)
            setPeople([...people] )
        }
    }>Sort by age</button>
}

const SortByIdButton = ({people, setPeople}:{people:Person[], setPeople: React.Dispatch<React.SetStateAction<Person[]>>}) => {
    return <button onClick={
        () => {
            people.sort((a,b) => a.id - b.id)
            setPeople([...people] )
        }
    }>Sort by Id</button>
}

const PeopleViewer = ({people,setPerson}:{people:Person[],setPerson: Function} ) => {

    return(
        <div>
            <h2>People</h2>
            <table >
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {people.map(person => {
                    return <PersonRow key={person.id} person={person} setPerson={setPerson}/>
                })
                }
                </tbody>
            </table>
        </div>
    )
}

const PersonRow = ({person, setPerson}:{person:Person,setPerson: Function}) => {
    const [editable,setEditable] =useState(false);
    const [personRow,setPersonRow] = useState(person);
    const onInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const value = event.target.value;
        setPersonRow({ ...person, [key]: value });
    };

    if (editable) {
        return(
            <tr key={person.id}>
                <td>{person.id}</td>
                <td><input id="name" type="text" value={personRow.name} onChange={onInputChange}/></td>
                <td><input id="age" type="text" value={personRow.age} onChange={onInputChange}/></td>
                <td><input id="city" type="text" value={personRow.city} onChange={onInputChange}/></td>
                <td><button onClick={() => {
                    setEditable(!editable)
                    const updatedPerson = new Person(person.id,personRow.name,parseInt(personRow.age.toString()),personRow.city)
                    const options = makeOptions("PUT",updatedPerson)
                    fetch("http://localhost:3008/person/"+updatedPerson.id,options)
                    setPerson(updatedPerson)
                }
                }>SAVE</button></td>
            </tr>)

    } else {
        return(
            <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.city}</td>
                <td><button onClick={() => setEditable(!editable)}>Edit</button></td>
            </tr>)
    }
}



const AddPersonForm = ({people, setPeople}:
                           {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {
    const [input, setInput] = useState({
        name: '',
        age: '',
        city: ''
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        if (
            !input.name || !input.age || !input.city
    ) {
            return
        }
        const newPerson = new Person(people.length+1, input.name, parseInt(input.age), input.city)
        const options = makeOptions("POST", newPerson);
        fetch("http://localhost:3008/person", options)

        people.push(newPerson)
        setPeople([...people])
        setInput({name: '',
            age: '',
            city: ''})
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={input.name}
                    onChange={handleChange}
                    name="name"
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={input.age}
                    onChange={handleChange}
                    name="age"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={input.city}
                    onChange={handleChange}
                    name="city"
                />
                <button onClick={handleClick}>
                    Add Person
                </button>
            </form>
        </div>
    )
}



const handleHttpErrors = async (res:Response) => {
    if (!res.ok) {
        return await Promise.reject({ status: res.status, fullError: res.json() });
    }
    if (res.status === 204) {
        return;
    };
    return await res.json();
};

const makeOptions = (method: string, body?: Person) => {
    var opts: RequestInit = {
        method: method,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    return opts;
};

export default App
