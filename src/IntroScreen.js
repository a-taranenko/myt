import React, { Component } from 'react'

class IntroScreen extends Component {
  selectCompany = (e, index) => {
    this.props.selectCompany(index)
  }

  renderCompanySelection = (company, index) => {
    return (
      <option key={index}
         onClick={(e) => this.selectCompany(e, index)}>
         {company.name}
      </option>
    )
  }

  getCompanyList = () => {
    let company = 'No companies to report'
    if (this.props.companies.length !== 0) company = this.props.companies.map((company, index) => this.renderCompanySelection(company, index))

    return (
      <select className="companies">
        {company}
      </select>
    )
  }

  render() {
    let companyList
    (this.props.companies.length !== 0) ? companyList = this.getCompanyList() : (companyList = 'No companies to report')

      return (
        <div className="main-container">
          <div className="content-container">
            <p>Hello {this.props.username}<br />
               Your role is: {this.props.role}<br />
               Please select from the following list:
            </p>
            {companyList}<br />
            <button id="logout-button" onClick={this.props.logout}>Log out</button>
          </div>
        </div>
      )
  }
}

export default IntroScreen
