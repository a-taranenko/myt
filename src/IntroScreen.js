import React, { Component } from 'react'

class IntroScreen extends Component {
  selectCompany = (e, index, action) => {
    (action === 'select') ? this.props.selectCompany(index) : this.props.deleteCompany(index)
  }

  renderCompanySelection = (company, index, action) => {
    return (
      <option key={index}
         onClick={(e) => this.selectCompany(e, index, action)}>
         {company.name}
      </option>
    )
  }

  getCompanyList = (action) => {
    let company = this.props.companies.map((company, index) => this.renderCompanySelection(company, index, action))

    return (
      <select className="companies">
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
