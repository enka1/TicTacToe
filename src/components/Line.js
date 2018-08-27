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
            isWinNode={this
            .props
            .winNodes
            .includes(x)}
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
      <div>
        {this.renderSquare()}
      </div>
    )

  }
}
