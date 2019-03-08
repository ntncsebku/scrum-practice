import React, { Component } from 'react';
import TrelloBoard from 'react-trello';

import './Board.scss';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    return (
      <>
        <TrelloBoard data={this.state.data} editable draggable onDataChange={data => this.setState({ data })} />
      </>
    );
  }
}

export default Board;
