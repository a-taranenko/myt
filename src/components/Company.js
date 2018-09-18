import React, { Component } from 'react'
// import './styling/Company.css'

class Company extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    let companyAddress = this.props.company.address
    let addressLine = companyAddress.suite + ' ' +
                      companyAddress.streetNumber + ' ' +
                      companyAddress.streetName + ' ' +
                      companyAddress.city + ' ' +
                      companyAddress.country
    let displayName = this.props.auth.getDisplayName()

    return (
      <div>
        <div>Hello {displayName}</div>
        <p>{this.props.company.name}</p>
        <p>{addressLine}</p>
        <p>{this.props.company.phone}</p>
        <p>{this.props.company.email}</p>
        <button id="deselect-company-button" onClick={this.props.deselectCompany}>Deselect</button>
      </div>
    )
  }
}

export default Company
