import React, { Component } from 'react'
import {getFieldName} from './utilityFunctions'

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

  submitCompany = (e) => {
    e.preventDefault()

    this.props.submitCompany()

    this.setState({
      add: false
    })
  }

  renderAddCompanyForm = () => {
    let containerClass = ((this.state.add) ? 'active-add-company-form-container' : 'collapsed-add-company-form-container')
    let formClass = ((this.state.add) ? 'active-add-company-form' : 'collapsed-add-company-form')
    let formFields = Object.keys(this.props.newCompany).map((field, index) => {
      return (
        <div key={index}>
          <label htmlFor={field}>{getFieldName(field)}</label> <br />
          <input type="text"
                 id={field}
                 value={this.props.newCompany[field]}
                 onChange={this.props.handleInput}/> <br />
        </div>
      )
    })

    return (
      <div className={containerClass}>
        <form className={formClass} onSubmit={this.submitCompany}>
          {formFields}
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
