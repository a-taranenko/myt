import React, { Component } from 'react'
import LogIn from './LogIn'
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false,
      username: "",
      password: ""
    }
  }

  componentWillMount() {
    // will have to determine if the user has logged in or not
  }

  logger = (e) => {
    e.preventDefault()

    // Have to somehow actually log in a user before changing state

    this.setState({
      logged: true
    })
  }

  handleInput = (input) => {
    this.setState({
      [input.target.id]: input.target.value
    })
  }

  renderLogInForm = () => {
    return (
      <LogIn logger={this.logger}
             handleInput={this.handleInput}
             username={this.state.username}
             password={this.state.password}>
      </LogIn>
    )
  }

  renderMainForm = () => {
    return (
      <div>
        <p>Hello {this.state.username}</p>
      </div>
    )
  }

  render() {
    return ( this.state.logged ? this.renderMainForm() : this.renderLogInForm() )
  }
}

export default App
