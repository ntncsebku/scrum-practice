import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth.action';

import './LoginPage.css'

class LoginPage extends Component {
    state = {
        username: '',
        password: ''
    }

    onFieldChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit = async e => {
        e.preventDefault();

        console.log('submti');
        this.props.logInUser(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) return <Redirect to='/' />

        return (
            <div class="Login">
                <div class="layer">

                    <form onSubmit={this.onFormSubmit} class="form-login">
                        <h2>Kanban</h2>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" class="form-control" name="username" value={this.state.username} onChange={this.onFieldChange}></input>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.onFieldChange}></input>
                        </div>
                        <button type="submit" class="btn btn-block btn-success">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => ({
    logInUser: (username, password) => dispatch(authActions.logInUser(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);