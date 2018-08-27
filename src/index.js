import React, {Component} from 'react';
import {render} from 'react-dom'
import validator from 'validator'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Board} from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rule: {
        size: 11,
        match: 5
      },
      setting: false
    }
  }
  render() {
    return (
      <div>
        <div className="position-relative">
          <div
            className="btn btn-outline-dark lead float-right m-3"
            onClick={() => this.setState({
            setting: !this.state.setting
          })}>
            <i className="fas fa-cog mr-2"></i>Settings</div>
          <div
            className={"col-3 bg-white shadow py-5 position-absolute px-4 " + (this.state.setting
            ? ''
            : 'd-none')}
            style={{
            top: 4 + 'rem',
            right: 4 + 'rem'
          }}>
            <div className="form-group">
              <label htmlFor="">Game size:</label>
              <input
                onChange={(e) => {
                let value = e.target.value;
                if (validator.isEmpty(value)) {
                  this.setState(prevState => ({
                    rule: {
                      ...prevState.rule,
                      size: 0
                    }
                  }))
                } else if (validator.isInt(value)) {
                  this.setState(prevState => ({
                    rule: {
                      ...prevState.rule,
                      size: parseInt(value, 10)
                    }
                  }))
                }
              }}
                value={this.state.rule.size}
                type="text"
                className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="">Match win:</label>
              <input
                onChange={(e) => {
                let value = e.target.value;
                if (validator.isEmpty(value)) {
                  this.setState(prevState => ({
                    rule: {
                      ...prevState.rule,
                      match: 0
                    }
                  }))
                } else if (validator.isInt(value)) {
                  this.setState(prevState => ({
                    rule: {
                      ...prevState.rule,
                      match: parseInt(value, 10)
                    }
                  }))
                }
              }}
                value={this.state.rule.match}
                type="text"
                className="form-control"/>
            </div>
          </div>
        </div>
        <div className="row w-100">
          <div className="container">
            <Board rule={this.state.rule}/>
          </div>
        </div>
      </div>
    )
  }
}

render(
  <App/>, document.getElementById('root'))