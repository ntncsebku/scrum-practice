import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from '../components/Board/Board';

import * as actions from '../actions/auth.action';

class HomePage extends Component {
    render() {
        return (
            <div>Homepage - {this.props.user.username}
                <button onClick={this.props.logOutUser}>Logout</button>
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