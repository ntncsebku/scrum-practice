import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth.action';

import './AuthPage.scss';

class SignUpPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }


  onFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

    onFormSubmit = async (e) => {
      e.preventDefault();
      this.props.signUp(this.state.username, this.state.password);
    }

    render() {
      if (this.props.isAuthenticated) return <Redirect to="/" />;
      if (this.props.signUpSuccess) return <Redirect to="/login" />;

      return (
        <div className="SignUp">
          <div className="layer">
            <form onSubmit={this.onFormSubmit} className="form-login">
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

const mapStateToProps = ({ auth: { isAuthenticated, signUpSuccess, signUpError } }) => ({ isAuthenticated, signUpSuccess, signUpError });

const mapDispatchToProps = dispatch => ({
  signUp: (username, password) => dispatch(authActions.signUp(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
