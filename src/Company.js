import React, { Component } from 'react'
// import './styling/Company.css'

class Company extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <p>{this.props.company.companyName}</p>
        <p>{this.props.company.address}</p>
        <p>{this.props.company.phone}</p>
        <p>{this.props.company.email}</p>
        <p>Your role: {this.props.role}</p>
        <button id="deselect-company-button" onClick={this.props.deselectCompany}>Deselect</button>
      </div>
    )
  }
}

export default Company
