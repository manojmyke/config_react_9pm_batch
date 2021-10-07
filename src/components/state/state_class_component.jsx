import { Component } from 'react';

export default class StateClass extends Component {
    state = {
        firstName: 'guest',
        lastName: '1',
        age: 10,
        address: {
            city: 'hyderabad',
            state: 'telangana'
        }
    };

    updateState = () => {
        this.setState({
            age: 27,
            address: {
                ...this.state.address,
                city: 'xyz'
            }
        });
    }

    render() {
        return (
            <>
                <p>{this.state.firstName}</p>
                <p>{this.state.lastName}</p>
                <p>{this.state.age}</p>
                <p>{this.state.address.city}</p>
                <p>{this.state.address.state}</p>

                <button type="button" onClick={this.updateState}>Update State</button>
            </>
        )
    }
}