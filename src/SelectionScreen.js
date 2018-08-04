import React, { Component } from 'react'

class SelectionScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      add: false
    }
  }

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

  addCompany = () => {
    this.setState(prevState => ({
        add: !prevState.add
    }))
  }

  renderAddCompanyForm = () => {
    let containerClass = ((this.state.add) ? 'active-add-company-form-container' : 'collapsed-add-company-form-container')
    let formClass = ((this.state.add) ? 'active-add-company-form' : 'collapsed-add-company-form')

    return (
      <div className={containerClass}>
        <form className={formClass}>
          <label htmlFor="name">Name</label><br />
          <input type="text"
                 id="name" /><br />
          <label htmlFor="email">Email</label><br />
          <input type="text"
                 id="email" /><br />
          <label htmlFor="phone">Phone</label><br />
          <input type="text"
                 id="phone" /><br />
          <label htmlFor="suite">Suite</label><br />
          <input type="text"
                 id="suite" /><br />
          <button id="add-company-button">Submit</button>
        </form>
      </div>
    )
  }

  render() {
    let companyList = ((this.props.companies.length !== 0) ? this.getCompanyList('select') : 'No companies to report')
    let companyListDelete = ((this.props.companies.length !== 0) ? this.getCompanyList('delete') : 'No companies to report')
    let addMinimize = (this.state.add ? 'Minimize' : 'Add company')
    let addCompanyForm = this.renderAddCompanyForm()

    return (
      <div className="main-container">
        <div className="content-container">
          <p>Hello {this.props.username}</p>
          <p>Your role is: {this.props.role}</p>
          <p>Company: {companyList}</p>
          <p>Delete company: {companyListDelete}</p>
          <button id="add-company" onClick={this.addCompany}>{addMinimize}</button><br />
          {addCompanyForm}
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }
}

export default SelectionScreen
