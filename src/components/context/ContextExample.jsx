import { createContext, useContext } from 'react';

// creating a context
const ExampleContext = createContext();
const NewContext = createContext();

// CompA
export default function CompA() {
    const username = "guest";
    const getUsername = () => username;

    return (
        <ExampleContext.Provider value={{ username, getUsername }}>
            <CompB />
        </ExampleContext.Provider>
    )
}

// CompB
function CompB() {
    const secretData = "oops!!";

    return (
        <NewContext.Provider value={secretData}>
            <CompC />
        </NewContext.Provider>
    )
}

// CompC
function CompC() {
    const contextData = useContext(ExampleContext);
    console.log('__CompC', contextData);

    return <CompD />
}

// CompD
function CompD() {
    const secretData = useContext(NewContext);
    console.log('__CompD', secretData);

    return <CompE />
}

// CompC
function CompE() {
    const contextData = useContext(ExampleContext);
    console.log('__CompE', contextData);

    return (
        <></>
    )
}