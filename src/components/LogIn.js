import React, { Component } from 'react'
import './../styling/LogIn.css'

class LogIn extends Component {
  // componentDidMount() {
  //   this.props.login()
  // }

  loginAuth = () => {
    this.props.login()
  }

  render() {
    return (
      <div>
        <p>Log in with Auth0</p>
        <button onClick={this.loginAuth}>Log In</button>
      </div>
    )
  }
}

export default LogIn
