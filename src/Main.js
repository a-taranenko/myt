import React, {Component} from 'react'
import Company from './Company'
import './styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: []
    }
  }

  componentWillMount() {
    // The following is just temporary
    // Need to call db to get company data for the logged user
    let companies = [ {companyName: 'CompOne'}, {companyName: 'CompTwo'} ]
    if (this.props.role === 'admin') companies.push({ companyName: 'MyT' })

    this.setState({
      companies: [...companies]
    })
  }

  renderCompany = (company, index) => {
    return (
      <Company key={index}
               companyName={company.companyName}>
      </Company>
    )
  }

  render() {
    let companyList = this.state.companies.map((company, index) => this.renderCompany(company, index))

    return (
      <div className="main-container">
        <div className="content-container">
          {companyList}
          <p>Hello {this.props.username}</p>
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }
}

export default Main
