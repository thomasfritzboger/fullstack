import React, {useContext} from "react";
import {UserContext} from "../context/UserContext"

export default function Login() {
    const {user,setUser} = useContext(UserContext);
    return (<button onClick={() => {
        setUser({...user, isLoggedIn:!user.isLoggedIn})
    }}>
        {!user.isLoggedIn ? "Login" : "Logout"}
    </button>)
}