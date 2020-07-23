import React, { Component } from 'react';
import Login from './login2';
import Logout from './logout';
import './authentication.css';


export default class auth extends Component {

    state = {}

    render() {
        const loginLogout = this.state.user ?
            <Logout user={this.state.user} onLogout={this.logout} /> :
            <Login onLogin={this.login} onRegister={this.register} />

        return (
            <div className="authenticate">
                {loginLogout}
            </div>
        );
    }

    register = async (name, password) => {
        try {
            console.log('trying register')
            const resp = await fetch(`http://localhost:5000/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            this.setState({
                name
            });
        } catch (e) {
            console.error(e);
        }
    }


    login = async (name, password) => {
        try {
            const resp = await fetch(`http://localhost:5000/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            this.setState({
                user: name
            });
        } catch (e) {
            console.error(e);
        }
    }

    logout = async () => {
        try {
            const resp = await fetch(`http://localhost:5000/logout`, {

                credentials: 'include',
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }

            this.setState({
                user: null
            });
        } catch (e) {
            console.error(e);
        }
    }
}






