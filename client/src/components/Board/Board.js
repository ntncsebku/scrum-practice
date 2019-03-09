import React, { Component } from 'react';
import TrelloBoard from 'react-trello';

import axios from 'axios';

import './Board.scss';
import { addItemToProject, fetchProject } from '../../api/project';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectId: '5c81e5bab241be5fed6704a8',
      data: {
        lanes: []
      }
    };
  }

  componentWillMount() {
    fetchProject({ projectId: this.state.projectId }).then((project) => {
      const { name, code, cols } = project;
      const data = {
        name, code,
        lanes: cols.map(c => ({
          id: c._id,
          title: c.name,
          cards: c.items.map(i => ({
            id: i._id,
            title: i.title,
            description: i.note
          }))
        }))
      };

      this.setState({ data });
    }).catch(err => console.log(err.response.data));
  }

  onCardAdd = (card, landId) => {
    // console.log(card);
    // console.log(landId);
    const { title, description, id, label } = card;

    addItemToProject({ projectId: this.state.projectId, colId: landId, title, description }).then(() => {
      console.log('OK');
    }).catch(err => alert(err.response.data));
  }

  onLaneAdd = (params) => {
    this.setState((prevState) => {
      const tempData = { ...prevState.data };
      tempData.lanes = prevState.data.lanes.concat({ id: params.title, title: params.title, cards: [] });
      return { data: tempData };
    });

    axios.post(`/api/project/m/${this.state.projectId}/col/add`, {
      name: params.title
    }, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  render() {
    return (
      <>
        <TrelloBoard data={this.state.data} editable draggable onDataChange={data => this.setState({ data })} onCardAdd={this.onCardAdd} canAddLanes onLaneAdd={this.onLaneAdd} />
      </>
    );
  }
}

export default Board;
