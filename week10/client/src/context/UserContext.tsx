import React, {createContext,useState} from "react";
import {User} from "../types";

export const UserContext = createContext<{user:User,
setUser: React.Dispatch<React.SetStateAction<User>>}>({
    user:{

        isLoggedIn:false,
        roles:["admin"],
        name:""
    },setUser:() => {}})

export default function UserContextProvider(props:{children:JSX.Element}) {
    const [user,setUser] = useState<User>({
        isLoggedIn:false,
        roles:["admin", "superuser"],
        name:""

    });

    return (
        <UserContext.Provider value= {{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

