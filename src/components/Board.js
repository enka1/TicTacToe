import React, {Component} from 'react';
import uuidv1 from 'uuid/v1'

import {Line} from './Line'

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array(3).fill(Array(3).fill(null))
    }
  }
  renderSquare() {
    return this
      .state
      .board
      .map(line => <Line key={uuidv1()} array={line}/>)
  }
  render() {
    return (
      <div>
        {this.renderSquare()}
      </div>
    );
  }
}