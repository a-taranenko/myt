import React, { Component } from 'react'
import LogIn from './LogIn'
import Gateway from './Gateway'
// import logo from './logo.svg';
import './../styling/App.css';

class App extends Component {
  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  renderLogIn = () => {
    return (
      <LogIn login={this.login}></LogIn>
    )
  }

  renderGateway = () => {
    return (
      <Gateway logout={this.logout}
               auth={this.props.auth}>
      </Gateway>
    )
  }

  render() {
    return (this.props.auth.isLoggedIn() ? this.renderGateway() : this.renderLogIn())
  }
}

export default App
