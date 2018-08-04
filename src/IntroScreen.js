import React, { Component } from 'react'

class IntroScreen extends Component {
  handleSelection = (event, action) => {
    (action === 'select') ? this.props.selectCompany(event.target.value) : this.props.deleteCompany(event.target.value)
  }

  renderCompanySelection = (company, index) => {
    return (
      <option key={index}
              value={index}>
         {company.name}
      </option>
    )
  }

  getCompanyList = (action) => {
    let company = this.props.companies.map((company, index) => this.renderCompanySelection(company, index))

    return (
      <select className="companies" defaultValue onChange={(event) => {this.handleSelection(event, action)}}>
        <option disabled value> -- Select your company -- </option>
        {company}
      </select>
    )
  }

  render() {
    let companyList = 'No companies to report'
    let companyListDelete = 'No companies to report'

    if (this.props.companies.length !== 0) {
      companyList = this.getCompanyList('select')
      companyListDelete = this.getCompanyList('delete')
    }

    return (
      <div className="main-container">
        <div className="content-container">
          <p>Hello {this.props.username}</p>
          <p>Your role is: {this.props.role}</p>
          <p>Company: {companyList}</p>
          <p>Delete company: {companyListDelete}</p>
          <button id="add-company" onClick={this.props.addCompany}>Add company</button><br />
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }
}

export default IntroScreen
