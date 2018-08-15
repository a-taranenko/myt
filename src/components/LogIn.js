import { Component } from 'react'
import './../styling/LogIn.css'

class LogIn extends Component {
  componentDidMount() {
    this.props.login()
  }

  render() {
    return null
  }
}

export default LogIn
