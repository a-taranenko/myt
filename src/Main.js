import React, {Component} from 'react'
import Company from './Company'
import CompanySelection from './CompanySelection'
import './styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: [],
      selected: false,
      selection: 0
    }
  }

  componentWillMount() {
    // The following is just temporary
    // Need to call db to get company data for the logged user
    let companies = [ {companyName: 'CompOne'}, {companyName: 'CompTwo'} ]
    if (this.props.role === 'admin') companies.push( {companyName: 'MyT'} )

    this.setState({
      companies: [...companies]
    })
  }

  renderCompany = (index) => {
    return (
      <Company key={index}
               company={this.state.companies[index]}>
      </Company>
    )
  }

  selectCompany = (index) => {
    this.setState({
      selected: true,
      selection: index
    })
  }

  rendenIntro = () => {
    let companyList = this.state.companies.map((company, index) => {
      return (
        <CompanySelection key={index}
                          index={index}
                          selectCompany={this.selectCompany}>
                          {company.companyName}
        </CompanySelection>
      )
    })

    return (
      <div className="main-container">
        <div className="content-container">
          <p>Hello {this.props.username}<br/>Please select from the following list:</p>
          {companyList}
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.selected) {
      return this.renderCompany(this.state.selection)
    } else {
      return this.rendenIntro()
    }
  }
}

export default Main
