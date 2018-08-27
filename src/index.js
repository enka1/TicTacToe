import React, {Component} from 'react';
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Board} from './components/Board'

class App extends Component {
  render() {
    return (
      <div className="row w-100">
        <div className="container pt-3">
          <Board/>
        </div>
      </div>
    )
  }
}

render(
  <App/>, document.getElementById('root'))