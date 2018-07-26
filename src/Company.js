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
        <button id="deselect-company-button" onClick={this.props.deselectCompany}>Deselect</button>
      </div>
    )
  }
}

export default Company
