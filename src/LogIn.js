import React, { Component } from 'react'

class LogIn extends Component {
  render() {
    return (
      <div className="login">
        <form onSubmit={this.props.logger}>
          Username: <input type="text"
                           id="username"
                           value={this.props.username}
                           onChange={this.props.handleInput} /><br />
          Password: <input type="password"
                           id="password"
                           value={this.props.password}
                           onChange={this.props.handleInput} /><br />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn