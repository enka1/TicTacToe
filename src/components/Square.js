import React, {Component} from 'react';
import styled from 'styled-components';

export class Square extends Component {
  renderContainer() {
    if (this.props.value === 'X') {
      return (<i
        className={"fas fa-times text-dark " + (this.props.isWinNode
        ? 'win'
        : '')}/>);
    } else if (this.props.value === 'O') {
      return (<i
        className={"far text-danger fa-circle " + (this.props.isWinNode
        ? 'win'
        : '')}/>);
    }
    return '';
  }
  render() {
    return (
      <SquareStyle
        onClick={() => this.props.onTick(this.props.x, this.props.y)}
        className="d-flex align-items-center justify-content-center">
        {this.renderContainer()}
      </SquareStyle>
    )
  }
}

const SquareStyle = styled.div `
  font-size: 1rem;
  border: 0.5px solid black;
  height: 3rem;
  width: 3rem;
  &:hover{
    background-color: #e1f5fe;
    cursor: pointer;
  }
`
