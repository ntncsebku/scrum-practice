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
      },
      pbl: {
        lanes: []
      },
      sbl: {
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
        })).slice(2)
      };
      const pbl = {
        name, code,
        lanes: cols.map(c => ({
          id: c._id,
          title: c.name,
          cards: c.items.map(i => ({
            id: i._id,
            title: i.title,
            description: i.note
          }))
        })).slice(0, 1)
      };
      const sbl = {
        name, code,
        lanes: cols.map(c => ({
          id: c._id,
          title: c.name,
          cards: c.items.map(i => ({
            id: i._id,
            title: i.title,
            description: i.note
          }))
        })).slice(1, 2)
      };
      this.setState({ data, pbl, sbl });
    }).catch(err => console.log(err.response.data));
  }

  onCardAdd = (card, landId) => {
    // console.log(card);
    // console.log(landId);
    const { title, description, id, label } = card;

    addItemToProject({ projectId: this.state.projectId, colId: landId, title, description, id }).then(() => {
      console.log('OK');
    }).catch(err => alert(err.response.data));
  }

  onCardDelete = (cardId, laneId) => {
    console.log(cardId, laneId);
    axios.delete(`/api/project/m/${this.state.projectId}/col/${laneId}/item/${cardId}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <h4 className="mt-2">Product Backlog</h4>
            <TrelloBoard
              data={this.state.pbl}
              editable draggable
              onCardDelete={this.onCardDelete}
              onDataChange={data => this.setState({ pbl: data })}
              onCardAdd={this.onCardAdd}
              style={{ backgroundColor: 'green' }}
            />
          </div>
          <div className="col-3 ">
            <h4 className="mt-2">Sprint Backlog</h4>
            <TrelloBoard
              data={this.state.sbl}
              editable draggable
              onCardDelete={this.onCardDelete}
              onDataChange={data => this.setState({ sbl: data })}
              onCardAdd={this.onCardAdd}
              style={{ backgroundColor: '#176075', padding: '0px !important', margin: '0px !important' }}
            />
          </div>
          <div className="col-6">
            <h4 className="mt-2">Kanban Board</h4>
            <TrelloBoard
              data={this.state.data}
              editable draggable
              onCardDelete={this.onCardDelete}
              onDataChange={data => this.setState({ data })}
              onCardAdd={this.onCardAdd}
              canAddLanes
              onLaneAdd={this.onLaneAdd}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
