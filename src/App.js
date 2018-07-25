import React, { Component } from 'react'
import LogIn from './LogIn'
import Main from './Main'
// import logo from './logo.svg';
import './styling/App.css';

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

  loginEntryCheck = () => {
    if (this.state.username.length !== 0 && this.state.password.length !== 0) return true

    // alert('Please fill all required fields')
    alert('Looks like you do not have a username or password.\nGet a username and password for just 10 bitcoin at imjustjoking.com')
    return false
  }

  login = (e) => {
    e.preventDefault()

    // Have to somehow actually log in a user before changing state

    if (this.loginEntryCheck()) {
      this.setState({
        logged: true,
        password: ""
      })
    }
  }

  logout = () => {
    this.setState({
      logged: false,
      username: "",
      password: ""
    })
  }

  handleInput = (input) => {
    this.setState({
      [input.target.id]: input.target.value
    })
  }

  renderLogInForm = () => {
    return (
      <LogIn login={this.login}
             handleInput={this.handleInput}
             username={this.state.username}
             password={this.state.password}>
      </LogIn>
    )
  }

  renderMainForm = () => {
    return (
      <Main logout={this.logout}
            username={this.state.username}>
      </Main>
    )
  }

  render() {
    return ( this.state.logged ? this.renderMainForm() : this.renderLogInForm() )
  }
}

export default App
