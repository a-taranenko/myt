import React, { Component } from 'react'
// import './styling/Company.css'

class Company extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <p>{this.props.company.companyName}</p>
    )
  }
}

export default Company
