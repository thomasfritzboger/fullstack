import React, {ChangeEvent, useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import CREATE_PERSON from "../mutations/CreatePerson";
import GET_PEOPLE from "../queries/GetPeople";
import {ThemeContext} from "../context/ThemeContext";

export default () => {
    const initialState = {
        name:"",
        age:0,
        url:""
    }
    const { isLight, light, dark} = useContext(ThemeContext)
    const theme = isLight ? light : dark;

    const [person, setPerson] = useState(initialState);
    const [mutateFunction, {data, loading, error}] = useMutation(CREATE_PERSON,{refetchQueries:[GET_PEOPLE]});

    if (loading) return <>'Submitting ...'</>;
    if (error) return <>`Submission error! ${error.message}`</>;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutateFunction({variables: {input:person}});
        setPerson(initialState)
    }
    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        if (name === "age") {
            setPerson({...person, [name]:parseInt(value)});
            return;
        }
        setPerson({...person, [name]:value});
    };

    return (
        <>
            <form onSubmit={onSubmit} style={{background:theme.bg,color:theme.color}}>
                <h2>Create a new person</h2>
                <input type="text" name="name" placeholder="Enter name" value={person.name} onChange={onChange}/>
                <input type="number" name="age" placeholder="Enter age" value={person.age} onChange={onChange}/>
                <input type="text" name="url" placeholder="Enter image url" value={person.url} onChange={onChange}/>
                <input type="submit" value="Create new Person"/>
            </form>
        </>
    )
}