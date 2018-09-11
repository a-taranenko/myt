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
      password: '',
      role: ''
    }
  }

  componentWillMount() {
    // will have to determine if the user has logged in or not
  }

  // loginEntryCheck = () => {
  //   if (this.state.username.length !== 0 && this.state.password.length !== 0) return true

  //   alert('Please fill all required fields')

  //   return false
  // }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
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
            stripRole={this.stripRole}
            auth={this.props.auth}>
      </Main>
    )
  }

  render() {
    return (this.props.auth.isLoggedIn() ? this.renderMainForm() : this.renderLogInForm())
  }
}

export default App
