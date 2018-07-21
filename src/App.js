import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false
    }
  }

  componentWillMount() {
    // will have to determine if the user has logged in or not
  }

  logger = (e) => {
    e.preventDefault()

    this.setState({
      logged: true
    })
  }

  renderLogInForm = () => {
    return (
      <div>
        <form onSubmit={this.logger}>
          Username: <input type="text" /><br />
          Password: <input type="text" /><br />
          <button>Log In</button>
        </form>
      </div>
    )
  }

  renderMainForm = () => {
    return (
      <div>
        <p>Main Form</p>
      </div>
    )
  }

  render() {
    return ( this.state.logged ? this.renderMainForm() : this.renderLogInForm() )
  }
}

export default App;
