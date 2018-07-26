import React, { Component } from 'react'
import CompanySelection from './CompanySelection'

class IntroScreen extends Component {
  renderCompanySelection = (company, index) => {
    return (
      <CompanySelection key={index}
                        index={index}
                        selectCompany={this.props.selectCompany}>
                        {company.companyName}
      </CompanySelection>
    )
  }

  render() {
    let companyList = this.props.companies.map((company, index) => this.renderCompanySelection(company, index))

    return (
      <div className="main-container">
        <div className="content-container">
          <p>Hello {this.props.username}<br />
             Your role is: {this.props.role}<br />
             Please select from the following list:
          </p>
          {companyList}
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }
}

export default IntroScreen
