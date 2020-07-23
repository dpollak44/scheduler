import React, { Component } from 'react';
import './login.css';



export default class auth extends Component {

    state = ({
        theModal: true,
        password: '',
        username: '',
        usernameAndPassword: true
    });

    handlePassword = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value,

        });
    }

    handleUsername = (e) => {
        console.log(e.target.value);
        this.setState({
            username: e.target.value,

        });
    }


    render() {



        const accessModal = this.state.theModal ? <div id="modal"></div> : null
        return (
            <>
                {/* {accessModal} */}


                {this.state.usernameAndPassword ? <div className="container" id="auth">
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="username" className="col-sm-3 col-form-label"> Username:  </label>
                            <input type="text" value={this.state.username} id="username" onChange={this.handleUsername}></input>
                            <br></br>
                            <label htmlFor="password" className="col-sm-3 col-form-label"> Password:  </label>
                            <input type="text" value={this.state.password} id="password" onChange={this.handlePassword}></input>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleLogin}>OK</button>

                    </form>
                </div> : null}
            </>
        )
    }

    handleLogin = async e => {
        e.preventDefault();
        this.setState({
            usernameAndPassword: null
        })

        if (this.state.password === "password")
            this.setState({
                theModal: false

            });

        try {
            const resp = await fetch('http://localhost/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ password: this.state.password, name: this.state.username })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
        } catch (e) {
            console.error(e);

        }
    }

}