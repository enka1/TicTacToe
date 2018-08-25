import React, {Component} from 'react';
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Board} from './components/Board'

class App extends Component {
  render() {
    return (
      <div>
        <Board/>
      </div>
    )
  }
}

render(
  <App/>, document.getElementById('root'))