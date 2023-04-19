import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddressViewer from "./components/AddressViewer";
import CreatePerson from "./components/CreatePerson";
import CreateAddress from "./components/CreateAddress";
import AddPersonToAddress from "./components/AddPersonToAddress";
import PeopleViewer from "./components/PeopleViewer";
import ThemeContextProvider from "./context/ThemeContext";

const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <>
        <ApolloProvider client={client}>
            <AddressViewer/>
            <PeopleViewer />
            <ThemeContextProvider >
                <div>
                    <CreatePerson/>
                    <CreateAddress/>
                </div>
            </ThemeContextProvider>
            <AddPersonToAddress/>
        </ApolloProvider>
        </>
    )
}

export default App
