import React, { Component } from 'react';
import { connect } from 'react-redux';


import './HomePage.scss';

import * as actions from '../actions/auth.action';
import Board from '../components/Board/Board';
import Header from '../components/Header/Header';

class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <Board />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(actions.logOutUser())
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
