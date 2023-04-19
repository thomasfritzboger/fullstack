import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import GET_ADDRESSES from "../queries/GetAddresses";
import GET_PEOPLE from "../queries/GetPeople";
import ADD_PERSON_TO_ADDRESS from "../mutations/AddPersonToAddress";
import {Address, Person} from "../types";
import GET_ADDRESS from "../queries/GetAddress";

export default () => {
    const initialState = {
        personId:"",
        addressId:""
    }
    const [state, setState] =
        useState(initialState);

    const personQuery = useQuery(GET_PEOPLE);
    const addressQuery = useQuery(GET_ADDRESSES);
    const [mutateFunction, {data, loading, error}] = useMutation(ADD_PERSON_TO_ADDRESS,{refetchQueries:[GET_ADDRESS]});

    if (loading) return <>Submitting</>;
    if (error) return <>`Submission error! ${error.message}`</>;

    if (personQuery.loading || addressQuery.loading) return <p>Loading ...</p>;
    else if (personQuery.error || addressQuery.error)
        return <p>Error: {personQuery.error?.message} {addressQuery.error?.message}</p>;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.personId === "" || state.addressId === "") {
            alert("Both fields must be filled out");
            return;
        }
        mutateFunction({variables: {input:state}});
        setState(initialState);
    }

    const onChange = (event: SelectChangeEvent):void => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state,[name]:value});
    }

    return (
        <>
            <h2>Add person to an address</h2>
            <form onSubmit={onSubmit}>
                <FormControl sx={{m:1, minWidth:120}}>
                    <h3>Select Person</h3>
                    <Select labelId="person-select" name="personId" onChange={onChange}>
                        {personQuery.data.people.map((person:Person)=>
                            <MenuItem key={person.id} value={person.id}>
                                {person.name}
                            </MenuItem>)}
                    </Select>
                    <h3>Select Address</h3>
                    <Select labelId="address-select" name="addressId" onChange={onChange}>
                        {addressQuery.data.addresses.map((address:Address)=>
                            <MenuItem key={address.id} value={address.id}>
                                {address.street}
                            </MenuItem>)}
                    </Select>
                    <input type="submit" value="Submit"/>
                </FormControl>
            </form>
        </>
    )
}