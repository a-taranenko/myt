import React, { Component } from 'react'
import LogIn from './LogIn'
import Main from './Main'
// import logo from './logo.svg';
import './../styling/App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false,
      username: '',
      password: ''
    }
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  renderLogInForm = () => {
    return (
      <LogIn login={this.login}></LogIn>
    )
  }

  renderMainForm = () => {
    return (
      <Main logout={this.logout}
            auth={this.props.auth}>
      </Main>
    )
  }

  render() {
    return (this.props.auth.isLoggedIn() ? this.renderMainForm() : this.renderLogInForm())
  }
}

export default App
