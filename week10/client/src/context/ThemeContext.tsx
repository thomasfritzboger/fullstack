import {createContext, useState} from "react";
import {Theme} from "../types";

export const ThemeContext = createContext<Theme>(
    {isLight:true,
        light:{color:"#555",bg:"#ddd"},
        dark:{color:"#ddd",bg:"#333"}}
);

export default function ThemeContextProvider(props:{ children:JSX.Element }) {
    const[theme,setTheme] = useState<Theme>({
        isLight:true,
        light:{color:"#555",bg:"#ddd"},
        dark:{color:"#ddd",bg:"#333"}}
    )
    return (
        <ThemeContext.Provider value={{...theme}}>
            <button onClick={() => setTheme({...theme,isLight:!theme.isLight})}>Toggle Theme</button>
            {props.children}
        </ThemeContext.Provider>
    )
}