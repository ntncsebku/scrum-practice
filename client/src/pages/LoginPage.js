import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth.action';

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

        this.props.logInUser(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) return <Redirect to='/' />

        return (
            <form onSubmit={this.onFormSubmit}>

                Username <br />
                <input name="username" value={this.state.username} onChange={this.onFieldChange}/> <br />
                Password <br />
                <input name="password" value={this.state.password} onChange={this.onFieldChange} /> <br />

                <button type="submit">Login</button>
            </form>
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => ({
    logInUser: (username, password) => dispatch(authActions.logInUser(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);