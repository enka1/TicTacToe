import React, {Component} from 'react';

import {Square} from './Square';

export class Line extends Component {
  renderSquare() {
    let x = -1;
    if (this.props.array) {
      return this
        .props
        .array
        .map(value => {
          x++;
          return <Square
            onTick={this.props.onTick}
            key={x}
            x={x}
            y={this.props.y}
            value={value}/>;
        })
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
