import React, { Component } from 'react'

class CompanyDashboard extends Component {
  renderCompanyData = () => {
    return (
      <div>
        <h1>Company Data Section</h1>
        <p>Company data that the user can change.</p>
      </div>
    )
  }

  renderEmployeeData = () => {
    return (
      <div>
        <h1>Employee Data Section</h1>
        <p>List of employees that the user can change.</p>
      </div>
    )
  }

  renderProductData = () => {
    return (
      <div>
        <h1>Product Data Section</h1>
        <p>List of products that the user can change.</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <p>Hello {this.props.auth.getDisplayName()}! You are not admin. No full access for you!</p>
        {
          this.props.auth.hasRole('owner') && (
            this.renderCompanyData()
          )
        }
        {
          this.props.auth.hasPermission('create:employee') && (
            this.renderEmployeeData()
          )
        }
        {this.renderProductData()}
        <button id="logout-button" onClick={this.props.logout}>Log out</button>
      </div>
    )
  }
}

export default CompanyDashboard
