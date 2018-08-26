import React, {Component} from 'react';

import {Line} from './Line'

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array(3)
        .fill(0)
        .map(() => Array(3).fill(null)),
      player: 'player1'
    }
    this.onTick = this
      .onTick
      .bind(this);
  }
  onTick(x, y) {
    let board = this.state.board;
    let player = this.state.player;
    if (!board[y][x]) {
      if (player === 'player1') {
        board[y][x] = 'X';
        player = 'player2';
      } else {
        board[y][x] = 'O';
        player = 'player1';
      }
      this.setState({board, player});
    }
  }
  isWin(value){
    
  }
  renderSquare() {
    let y = -1;
    return this
      .state
      .board
      .map(line => {
        y++;
        return <Line onTick={this.onTick} key={y} y={y} array={line}/>;
      })
  }
  render() {
    return (
      <div>
        {this.renderSquare()}
      </div>
    );
  }
}
