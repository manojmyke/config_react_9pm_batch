import { useState, useEffect } from 'react';

export default function UseEffectHook() {
    const [firstname, setFirstname] = useState('sai');
    const [lastname, setLastname] = useState('manoj');
    const [age, setAge] = useState(10);

    // useEffect is a react hook which takes 2 args (func as 1st & [] as 2nd)

    // when 2nd arg of useEffect is an empty array [], then that function provided as 1st arg will be executed only once after the component loads / mounts.
    useEffect(() => {
        // setAge(age + 1);
        console.log('hi')
    });

    return (
        <>
            <p>{firstname}</p>
            <p>{lastname}</p>
            <p>{age}</p>


            <button onClick={() => setLastname(`${lastname}-${Math.floor(Math.random() * 100)}`)}>Update last name</button>
        </>
    )
}