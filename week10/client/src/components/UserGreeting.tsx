import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function UserGreeting() {
    const {user} = useContext(UserContext);

    return(
        user.isLoggedIn? <p>{user.name} is logged in as the following roles: {user.roles.sort().join(', ')}</p> : <p/>
    )
}