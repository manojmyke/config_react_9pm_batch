import { useState } from 'react';

export default function StateFunctional() {
    const [firstName, setFirstName] = useState('guest');
    const [lastName, setLastName] = useState('1');
    const [age, setAge] = useState(10);
    const [address, setAddress] = useState({
        city: 'hyderabad',
        state: 'telangana'
    });

    const updateState = () => {
        setFirstName('sai');
        setLastName('manoj');
        setAge(27);
        setAddress({
            ...address,
            state: 'xyz'
        });
    };

    return (
        <>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{age}</p>
            <p>{JSON.stringify(address)}</p>

            <button onClick={updateState} type="button">Update State</button>
        </>
    )
}