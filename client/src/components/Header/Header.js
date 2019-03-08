import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';

import * as actions from '../../actions/auth.action';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showInvite: false
    };
  }

  handleInvite = () => {
    this.setState({ showInvite: true });
  }

  handleCloseInvite = () => {
    this.setState({ showInvite: false });
  }

  handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      this.props.logOutUser();
    }
  }

  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>
          <Form inline>
            <Button className="ml-2" variant="outline-primary" onClick={() => this.handleInvite()}>Invite</Button>
            <Button className="ml-2" variant="outline-danger" onClick={this.handleLogout}>Logout</Button>
          </Form>
        </Navbar>

        <Modal show={this.state.showInvite} onHide={this.handleCloseInvite}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseInvite}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleCloseInvite}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(actions.logOutUser())
});

export default connect(null, mapDispatchToProps)(Header);
