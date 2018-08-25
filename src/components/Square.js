import React, {Component} from 'react';
import styled from 'styled-components'

export class Square extends Component {
  renderContainer() {
    if (this.props.value === 'X') {
      return (<i className="fas fa-times"/>)
    } else if (this.props.value === 'O') {
      return (<i className="far fa-circle"/>)
    }
    return ''
  }
  render() {
    return (
      <SquareStyle className="d-flex align-items-center justify-content-center">
        {this.renderContainer()}
      </SquareStyle>
    )
  }
}

const SquareStyle = styled.div `
  border: 0.5px solid black;
  height: 4rem;
  width: 4rem;
  &:hover{
    background-color: #e1f5fe;
    cursor: pointer;
  }
`