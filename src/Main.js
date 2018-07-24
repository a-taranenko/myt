import React, {Component} from 'react'
import './styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companyName: "",
      superUser: false
    }
  }

  componentWillMount() {
    // The following is just temporary
    // Need to call db to get the following info
    let companyName, superUser
    if (this.props.username === 'Anton' || this.props.username === 'Tantely') {
      companyName = 'MyT'
      superUser = true
    } else {
      companyName = 'Default Company Name'
      superUser = false
    }

    this.setState({
      companyName: companyName,
      superUser: superUser
    })
  }

  render() {
    return (
      <div className="main-container">
        <div className="content-container">
          <p>{this.state.companyName}</p>
          <p>Hello {this.props.username}</p>
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }
}

export default Main
