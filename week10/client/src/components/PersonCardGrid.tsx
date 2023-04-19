import Grid from "@mui/material/Grid";
import PersonCard from "./PersonCard";
import {Person} from "../types";
import React from "react";

export default ({people}:{people:Person[]}) => {
    return (
        <Grid container rowSpacing={6} columnSpacing={{xs:1, sm:2, md:3}}>
            {people.map((person:Person) => (
                <Grid item xs={6} key={person.id}>
                    <PersonCard person={person}/>
                </Grid>
            ))}
        </Grid>
    )
}