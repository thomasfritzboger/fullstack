import React, {useContext} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Person} from "../types";
import {useMutation} from "@apollo/client";
import DELETE_PERSON from "../mutations/DeletePerson";
import GET_PEOPLE from "../queries/GetPeople";
import GET_ADDRESS from "../queries/GetAddress";
import {UserContext} from "../context/UserContext";

export default ({person}:{person:Person}) => {
    const {user} = useContext(UserContext);

    function DeletePerson( {personId}:{personId: String}) {
        const [deletePerson] = useMutation(DELETE_PERSON, {
            variables: { deletePersonId: personId },
            refetchQueries: [GET_PEOPLE, GET_ADDRESS]
        });
        return <button onClick={() => deletePerson()} value={person.id}>Delete Person</button>;
    };

    return (
        <div>
            <Card sx={{maxWidth:220}} style={{
                display:"block",
                width:"30vw",
                transitionDuration: "0.3s",
                height:"31vw",
                border:"1px solid #ccc",
            }}>
                <CardMedia
                    sx={{height:250}}
                    image={person.url}
                    title={person.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {person.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {person.age}
                    </Typography>
                    {user.isLoggedIn && user.roles.includes("admin") && <DeletePerson personId={person.id} />}
                </CardContent>
            </Card>
        </div>
    )
}