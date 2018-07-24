import React, {Component} from 'react'

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
      <div className="main">
        <h1>{this.state.companyName}</h1>
        <p>Hello {this.props.username}</p>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    )
  }
}

export default Main
