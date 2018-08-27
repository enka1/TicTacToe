import React, {Component} from 'react';
import styled from 'styled-components'
import validator from 'validator'

import {Line} from './Line'

let left_root_node = {},
  right_root_node = {};

const find_right_root_node = (x, y, size) => {
  // Xét từ bên phải sang thì x > y sẽ thành x < y rồi xét như lúc đầu 0 sẽ trở
  // thành max là size phải trừ  1 size vì array bắt đầu từ 0
  if (size - x - 1 < y) {
    right_root_node = {
      x: size,
      y: y - (size - x - 1)
    }
  } else if (size - x - 1 > y) {
    right_root_node = {
      x: x + y,
      y: 0
    }
  } else {
    right_root_node = {
      x: size - 1,
      y: 0
    }
  }
}

const find_left_root_node = (x, y) => {
  if (x < y) {
    left_root_node = {
      x: 0,
      y: y - x
    }
  } else if (x > y) {
    left_root_node = {
      x: x - y,
      y: 0
    }
  } else {
    left_root_node = {
      x: 0,
      y: 0
    }
  }
}

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_game_play: true,
      board: [],
      player: 'player1',
      rule: {
        size: 11,
        match: 5
      },
      win_nodes: []
    }
    this.onTick = this
      .onTick
      .bind(this);
  }
  reConstructBoard() {
    this.setState({
      board: Array(this.state.rule.size)
        .fill(0)
        .map(() => Array(this.state.rule.size).fill(null))
    })
  }
  componentDidMount() {
    this.reConstructBoard()
  }
  onTick(x, y) {
    let board = this.state.board;
    let player = this.state.player;
    //Check giá trị ô k phải là null sẽ được tick
    if (!board[y][x] && this.state.is_game_play) {
      if (player === 'player1') {
        board[y][x] = 'X';
        player = 'player2';
        this.isWin('X', board, {
          x,
          y
        }, this.state.rule)
      } else {
        board[y][x] = 'O';
        player = 'player1';
        this.isWin('O', board, {
          x,
          y
        }, this.state.rule);
      }
      this.setState({board, player});
    }
  }
  async isWin(value, board, position, rule) {
    let v_nodes = [],
      h_nodes = [],
      l_nodes = [],
      r_nodes = [];
    let v_match = 0,
      h_match = 0,
      l_diagonal = 0,
      r_diagonal = 0;
    for (let i = 0; i < rule.size; i++) {
      if (board[i][position.x] === value) {
        v_nodes.push({x: position.x, y: i});
        v_match++;
      } else {
        v_nodes = [];
        v_match = 0;
      }
      if (board[position.y][i] === value) {
        h_nodes.push({x: i, y: position.y});
        h_match++;
      } else {
        h_nodes = [];
        h_match = 0;
      }
      if (v_match === rule.match) {
        await this.setState({
          win_nodes: [
            ...this.state.win_nodes,
            ...v_nodes
          ],
          is_game_play: false
        });
      }
      if (h_match === rule.match) {
        await this.setState({
          win_nodes: [
            ...this.state.win_nodes,
            ...h_nodes
          ],
          is_game_play: false
        });
      }
    }
    find_left_root_node(position.x, position.y)
    for (let x = left_root_node.x, y = left_root_node.y; x < rule.size && y < rule.size; x++, y++) {
      if (board[y][x] === value) {
        r_nodes.push({x, y})
        r_diagonal++
      } else {
        r_nodes = []
        r_diagonal = 0
      }
      if (r_diagonal === rule.match) {
        await this.setState({
          win_nodes: [
            ...this.state.win_nodes,
            ...r_nodes
          ],
          is_game_play: false
        })
      }
    }
    find_right_root_node(position.x, position.y, this.state.rule.size)
    for (let x = right_root_node.x, y = right_root_node.y; 0 <= x && y < rule.size; x--, y++) {
      if (board[y][x] === value) {
        l_nodes.push({x, y});
        l_diagonal++;
      } else {
        l_nodes = [];
        l_diagonal = 0;
      }
      if (l_diagonal === rule.match) {
        await this.setState({
          win_nodes: [
            ...this.state.win_nodes,
            ...l_nodes
          ],
          is_game_play: false
        })
      }
    }
  }

  renderLine() {
    let y = -1;
    return this
      .state
      .board
      .map(line => {
        y++;
        let win_nodes = this
          .state
          .win_nodes
          .filter(node => node.y === y)
          .map(win_nodes => win_nodes.x);
        return <Line winNodes={win_nodes} onTick={this.onTick} key={y} y={y} array={line}/>;
      })
  }
  render() {
    return (
      <div>
        <div className="col-4 shadow py-5 d-none px-4">
          <div className="form-group">
            <label htmlFor="">Game size:</label>
            <input
              onChange={async(e) => {
              let value = e.target.value;
              if (validator.isInt(value)) {
                await this.setState(prevState => ({
                  rule: {
                    ...prevState.rule,
                    size: parseInt(value, 10)
                  }
                }))
              }
              this.reConstructBoard()
            }}
              value={this.state.rule.size}
              type="text"
              className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="">Match win:</label>
            <input value={this.state.rule.match} type="text" className="form-control"/>
          </div>
          <div className="btn btn-outline-success mt-3">Start new game</div>
        </div>
        <BoardStyle className="d-flex justify-content-center align-items-center">
          {this.renderLine()}
        </BoardStyle>
      </div>

    );
  }
}

const BoardStyle = styled.div `
  min-height: 60vh;
  .win{
    color: #311b92!important;
    animation: popUp 2s;
  }
  @keyframes popUp{
    0%{
      opacity: 0;
      transform: scale(0)
    }
    75%{
      transform: scale(10)
    }
    100%{
      opacity: 1;
      transform: scale(1)
      
    }
  }
`