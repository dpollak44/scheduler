import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref="name" placeholder="name" />
                <input type="password" ref="password" placeholder="password" />
                <button onClick={this.handleLogin}>login</button>
                <button onClick={this.handleRegister}>register</button>
            </form>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    handleLogin = () => {
        this.props.onLogin(this.refs.name.value, this.refs.password.value);
    }

    handleRegister = () => {
        this.props.onRegister(this.refs.name.value, this.refs.password.value);
    }
}