import React, { Component } from 'react'
import LogIn from './LogIn'
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
      <LogIn />
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

export default App
