import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddressViewer from "./components/AddressViewer";
import PeopleViewer from "./components/PeopleViewer";
import ThemeContextProvider from "./context/ThemeContext";
import UserContextProvider, {UserContext} from "./context/UserContext";
import Login from "./components/Login";
import Admin from "./components/Admin";
import UserGreeting from "./components/UserGreeting";

const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <>
        <ApolloProvider client={client}>
            <ThemeContextProvider >
                <UserContextProvider>
                    <div>
                        <Login/>
                        <UserGreeting/>
                        <AddressViewer/>
                        <PeopleViewer />
                        <Admin/>
                    </div>
                </UserContextProvider>
            </ThemeContextProvider>
        </ApolloProvider>
        </>
    )
}

export default App
