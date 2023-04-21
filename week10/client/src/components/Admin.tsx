import React, {useContext} from "react";
import {UserContext} from "../context/UserContext"
import CreatePerson from "./CreatePerson";
import CreateAddress from "./CreateAddress";
import AddPersonToAddress from "./AddPersonToAddress";

export default function Admin() {
    const {user} = useContext(UserContext);
    return user.isLoggedIn && user.roles.includes("admin") ?
           <>
               <CreatePerson/>
               <CreateAddress/>
               <AddPersonToAddress/>
           </>
           :  <></>
}