import React, { Component } from 'react';
import TrelloBoard from 'react-trello';

import axios from 'axios';

import './Board.scss';

const projectId = '5c832598d6b43c6cd9f73288';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        lanes: []
      }
    };
  }

  componentDidMount = async () => {
    const { data } = await axios.get(`/api/project/${projectId}`);

    console.log(data);

    const tempLanes = data.cols;
    const tempData = {};
    tempData.data = {};
    tempData.data.lanes = tempLanes;
    console.log('>>', tempData);
    this.setState({ data: tempData });
  }

  onLaneAdd = (params) => {
    this.setState((prevState) => {
      const tempData = { ...prevState.data };
      tempData.lanes = prevState.data.lanes.concat({ id: params.title, title: params.title, cards: [] });
      return { data: tempData };
    });

    axios.post(`/api/project/m/${projectId}/col/add`, {
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
        <TrelloBoard data={this.state.data} editable draggable onDataChange={data => this.setState({ data })} canAddLanes onLaneAdd={this.onLaneAdd} />
      </>
    );
  }
}

export default Board;
