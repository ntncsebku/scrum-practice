import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from '../components/Board/Board';

import './HomePage.scss';

import * as actions from '../actions/auth.action';

class HomePage extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">Homepage</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link">Username: {this.props.user.username}<span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={this.props.logOutUser}>Logout</button>
            </form>
          </div>
        </nav>

        <Board />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(actions.logOutUser())
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
