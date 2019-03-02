import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/auth.action';

class HomePage extends Component {
    render() {
        return (
            <div>Homepage
                <button onClick={this.props.logOutUser}>Logout</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logOutUser: () => dispatch(actions.logOutUser())
});

export default connect(null, mapDispatchToProps)(HomePage);