import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth.action';

import './AuthPage.scss';
import { signUp } from '../api/auth';

class SignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      directToLogin: false
    };
  }

  onFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    if (this.state.username == '' || this.state.password == '') {
      return alert('Username and password can not be empty');
    }
    if (this.state.confirmPassword != this.state.password) {
      return alert('Confirm password is not match');
    }
    signUp({ username: this.state.username, password: this.state.password }).then((data) => {
      alert('Register successfully');
      this.setState({ username: '', password: '', confirmPassword: '', directToLogin: true });
    }).catch(err => alert(err.response.data.msg));
  }

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    if (this.state.directToLogin) return <Redirect to="/login" />;

    return (
      <div className="AuthPage">
        <div className="layer">
          <form onSubmit={this.onFormSubmit} className="form-auth-page">
            <h2>Kanban</h2>
            <h5 className="mb-3 mt-1">
              Create a new account
            </h5>
            <div className="form-group">
              <i className="fa fa-user" />
              <input type="text" placeholder="Username" className="form-control" name="username" value={this.state.username} onChange={this.onFieldChange} />
            </div>
            <div className="form-group">
              <i className="fa fa-key" />
              <input type="password" placeholder="Password" className="form-control" name="password" value={this.state.password} onChange={this.onFieldChange} />
            </div>
            <div className="form-group">
              <i className="fa fa-key" />
              <input type="password" placeholder="Confirm Password" className="form-control" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onFieldChange} />
            </div>
            <button type="submit" className="btn btn-block btn-success" onClick={this.onFormSubmit}>Sign Up</button>
            {this.props.signUpError && <div className="alert alert-danger text-center my-2">Error</div>}
            <hr />
            <Link to="/login" className="btn btn-block btn-outline-danger mt-3">Back to login</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
