import React, {Component} from 'react'

class Main extends Component {
  render() {
    return (
      <div className="main">
        <p>Hello {this.props.username}</p>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    )
  }
}

export default Main
