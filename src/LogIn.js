import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return (
      <div className="login">
        <form>
          Username: <input type="text" /><br />
          Password: <input type="text" /><br />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn