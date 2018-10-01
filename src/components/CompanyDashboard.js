import React, { Component } from 'react'
import { getData, postData } from './../utilities/utilityFunctions'
import { userSpecificCompanyApiEndpoint } from './../utilities/apiEndpointData'

class CompanyDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      company: {

      }
    }
    this.userCompanyApi = userSpecificCompanyApiEndpoint
  }

  componentDidMount() {
    let email = this.props.auth.getEmail()
    this.getCompanyData(`https://myt-world-restapi.herokuapp.com/api/v1/companies/email/${email}`)
  }

  getCompanyData = (url) => {
    let self = this

    getData(url)
      .then(json => {
        if (json.status === 'success') {
          self.setState({ company: {...json.data} })
        } else {
          let error = new Error(`could not retrieve company data`)
          throw error
        }
      }).catch((error) => {
        self.setState({ company: {} })
        console.log(error)
      })
  }

  renderCompanyData = () => {
    if (Object.keys(this.state.company).length === 0) {
      return (
        <div>
          <h1>Company Data Section</h1>
          <p>Company data that the user can change.</p>
        </div>
      )
    }

    return (
      <div>
        <h1>Company Data Section</h1>
        <p>{this.state.company.name}</p>
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
