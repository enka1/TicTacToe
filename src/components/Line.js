import React, {Component} from 'react';
import uuidv1 from 'uuid/v1'

import {Square} from './Square';

export class Line extends Component {
  renderSquare() {
    if (this.props.array) {
      return this
        .props
        .array
        .map(value => <Square key={uuidv1()} value={value}/>)
    }
  }
  render() {
    return (
      <div className="d-block d-flex">
        {this.renderSquare()}
      </div>
    )

  }
}
