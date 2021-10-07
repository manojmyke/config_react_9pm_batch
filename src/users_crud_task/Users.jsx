import { useState, useEffect } from 'react';
import './styles.css';

export default function Users() {
    const [state, setState] = useState({
        users: [],
        editData: null
    });

    // get users data on initial render
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(apiResponse => apiResponse.json())
            .then(response => {
                const usersWithStatus = response.map(user => ({ ...user, isActive: Math.floor(Math.random() * 100) >= 50 }))
                console.log('__usersWithStatus', usersWithStatus);
                setState({ ...state, users: usersWithStatus });
            });
    }, []);

    const handleUserClick = (userId) => {
        const udpdatedUsersData = state.users.map(user => {
            if (user.id === userId) return { ...user, isActive: !user.isActive }
            else return user;
        });
        setState({ ...state, users: udpdatedUsersData });
    };

    const editUser = (userId) => {
        setState({ ...state, editData: state.users.find(user => user.id === userId) });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const updatedUsersData = state.users.map(user => {
            if (user.id === state.editData.id)
                return { ...user, username: state.editData.username, email: state.editData.email }
            else return user;
        });

        setState({ ...state, users: updatedUsersData });
    };

    const handleInputChange = (event) => {
        setState({
            ...state,
            editData: {
                ...state.editData,
                [event.target.name]: event.target.value
            }
        });
    };

    return (
        <section className="users">
            <div className="users_container">
                {state.users.map(({ username, email, id, isActive }) => (
                    <div key={id} className={`user_item ${isActive ? 'active' : 'inactive'}`} onClick={() => handleUserClick(id)}>
                        <h2 className="username">{username}</h2>
                        <p className="user_email">{email}</p>

                        <button type="button" disabled={!isActive} onClick={(event) => {
                            event.stopPropagation();
                            editUser(id);
                        }}>Edit</button>
                    </div>
                ))}
            </div>

            {state.editData && <div className="user-container">
                <form onSubmit={handleFormSubmit}>
                    <input name="username" onChange={handleInputChange} value={state.editData.username} type="text" placeholder="Enter your username" />
                    <input name="email" onChange={handleInputChange} value={state.editData.email} type="email" placeholder="Enter your email" />

                    <button type="submit">Update</button>
                </form>
            </div>}
        </section>
    )
}