import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowserRouter from './router';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                Header

                <BrowserRouter isAuthenticated={this.props.isAuthenticated} />
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated });

export default connect(mapStateToProps)(App);
