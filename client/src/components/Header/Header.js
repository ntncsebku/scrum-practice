import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';

import * as actions from '../../actions/auth.action';
import { invite, fetchProject } from '../../api/project';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectId: '5c81e5bab241be5fed6704a8',
      showInvite: false,
      memberName: '',
      members: []
    };
  }


  componentWillMount() {
    fetchProject({ projectId: this.state.projectId }).then((project) => {
      const { name, code, cols, creator, members } = project;
      console.log(members);

      this.setState({ members: [...members, creator] });
    }).catch(err => console.log(err.response.data));
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


  handleInviteMember = () => {
    invite({ projectId: this.state.projectId, username: this.state.memberName }).then(() => {
      console.log('OK');
      alert('Invite successfully');
      this.setState({ memberName: '', showInvite: false });
    }).catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>
          <Nav className="ml-3"><span>{this.props.username }</span></Nav>
          <Form inline>
            <Button className="ml-2" variant="outline-primary" onClick={() => this.handleInvite()}>Members</Button>
            <Button className="ml-2" variant="outline-danger" onClick={this.handleLogout}>Logout</Button>
          </Form>
        </Navbar>

        <Modal show={this.state.showInvite} onHide={this.handleCloseInvite}>
          <Modal.Header closeButton>
            <Modal.Title>Invite Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <Form.Group controlId="">
                <Form.Label>Username</Form.Label>
                <Form.Control className="ml-4" type="text" placeholder="Enter username" onChange={ev => this.setState({ memberName: ev.target.value })} />
              </Form.Group>
            </Form>
            <h3>Members</h3>
            <div>
              {this.state.members.map(u => (
                <div key={u.username}>{u.username}</div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseInvite}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleInviteMember}>
            Invite
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

const mapStateToProps = ({ auth: { user } }) => ({ username: user.username });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
