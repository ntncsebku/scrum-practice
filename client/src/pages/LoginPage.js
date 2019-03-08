import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth.action';

import './AuthPage.scss';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  onFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    if (this.state.username == '' || this.state.password == '') {
      return alert('Username and password can not be empty');
    }
    this.props.logInUser(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <div className="AuthPage">
        <div className="layer" />
        <form onSubmit={this.onFormSubmit} className="form-auth-page">
          <h2>Kanban</h2>
          <div className="form-group">
            <i className="fa fa-user" />
            <input type="text" placeholder="Username" className="form-control" name="username" value={this.state.username} onChange={this.onFieldChange} />
          </div>
          <div className="form-group">
            <i className="fa fa-key" />
            <input type="password" placeholder="Password" className="form-control" name="password" value={this.state.password} onChange={this.onFieldChange} />
          </div>
          <button type="submit" className="btn btn-block btn-success" onClick={this.onFormSubmit}>Login</button>
          {this.props.loginError && <div className="alert alert-danger text-center my-2">Error</div>}
          <hr />
          <Link to="/sign-up" className="btn btn-block btn-outline-danger mt-3">Create a new account</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => ({
  logInUser: (username, password) => dispatch(authActions.logInUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
