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
      username: '',
      password: '',
      role: ''
    }
  }

  componentWillMount() {
    // will have to determine if the user has logged in or not
  }

  loginEntryCheck = () => {
    if (this.state.username.length !== 0 && this.state.password.length !== 0) return true

    alert('Please fill all required fields')

    return false
  }

  login = (e) => {
    e.preventDefault()

    if (this.loginEntryCheck()) {
      // Have to somehow actually log in a user before changing state
      // This is where we call the db to determine who is logging in
      // Here, we should know determine the role of the user
      // We should also deal with situations where we cannot find a user

      // The following is only temporary
      let role = ''
      if (this.state.username === 'Anton' || this.state.username === 'Tantely') role = 'admin'

      this.setState({
        logged: true,
        password: '',
        role: role
      })
    }
  }

  logout = () => {
    this.setState({
      logged: false,
      username: '',
      password: '',
      role: ''
    })
  }

  handleInput = (input) => {
    this.setState({
      [input.target.id]: input.target.value
    })
  }

  assignRole = () => {
    // Need to call db to get role

    this.setState({
      role: 'owner'
    })
  }

  stripRole = () => {
    this.setState({
      role: ''
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
            username={this.state.username}
            role={this.state.role}
            assignRole={this.assignRole}
            stripRole={this.stripRole}>
      </Main>
    )
  }

  render() {
    return ( this.state.logged ? this.renderMainForm() : this.renderLogInForm() )
  }
}

export default App
