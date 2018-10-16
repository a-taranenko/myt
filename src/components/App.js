import React, { Component } from 'react'
import LogIn from './LogIn'
import Gateway from './Gateway'
// import logo from './logo.svg';
import './../styling/App.css';

class App extends Component {
  renderLogIn = () => {
    return (
      <LogIn login={this.props.auth.login}></LogIn>
    )
  }

  renderGateway = () => {
    return (
      <Gateway logout={this.props.auth.logout}
               auth={this.props.auth}>
      </Gateway>
    )
  }

  render() {
    return (this.props.auth.isLoggedIn() ? this.renderGateway() : this.renderLogIn())
  }
}

export default App
