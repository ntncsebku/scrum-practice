import React, { Component } from 'react';
import TrelloBoard from 'react-trello';

import './Board.scss';
import { addItemToProject, fetchProject } from '../../api/project';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectId: '5c81e5bab241be5fed6704a8',
      data: {
        lanes: [
          {
            id: 'lane1',
            title: 'Planned Tasks',
            label: '2/2',
            cards: [
              { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
              { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
            ]
          },
          {
            id: 'lane2',
            title: 'Completed',
            label: '0/0',
            cards: []
          }
        ]
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

  render() {
    return (
      <>
        <TrelloBoard data={this.state.data} editable draggable onCardAdd={this.onCardAdd} onDataChange={data => this.setState({ data })} />
      </>
    );
  }
}

export default Board;
