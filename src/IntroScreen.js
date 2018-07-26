import React, { Component } from 'react'

class IntroScreen extends Component {
  selectCompany = (e, index) => {
    this.props.selectCompany(index)
  }

  renderCompanySelection = (company, index) => {
    return (
      <p key={index}
         onClick={(e) => this.selectCompany(e, index)}>
         {company.companyName}
      </p>
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
