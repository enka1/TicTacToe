import React, {Component} from 'react';

let h_match = 0
let v_match = 0

import {Line} from './Line'

const rule = {
  match: 4,
  size: 6
}

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array(rule.size)
        .fill(0)
        .map(() => Array(rule.size).fill(null)),
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
        this.isWin('X', board, {x, y})
      } else {
        board[y][x] = 'O';
        player = 'player1';
        this.isWin('O', board, {x, y})
      }
      this.setState({board, player});

    }
  }
  isWin(value, board, position) {
 
   
    for (let i = 0; i < rule.size; i++) {
      if (board[position.x][i] === value) {
        v_match++
      } else {
        v_match = 0
      }
      if (v_match === rule.match) {
        alert('WIN')
      }
    }
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
