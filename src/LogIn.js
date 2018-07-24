import React, { Component } from 'react'
import './styling/LogIn.css'

class LogIn extends Component {
  render() {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.props.login}>
          <label htmlFor="username">Username</label><br />
          <input type="text"
                 id="username"
                 value={this.props.username}
                 onChange={this.props.handleInput} /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password"
                 id="password"
                 value={this.props.password}
                 onChange={this.props.handleInput} /><br />
          <button id="login-button">Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn
