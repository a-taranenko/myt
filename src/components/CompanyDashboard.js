import React, { Component } from 'react'
import { getData, postData } from './../utilities/utilityFunctions'
import { userSpecificCompanyApiEndpoint } from './../utilities/apiEndpointData'

class CompanyDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      company: {}
    }
    this.userCompanyApi = userSpecificCompanyApiEndpoint
  }

  componentDidMount() {
    if (this.props.company) {
      this.setState({
        company: this.props.company
      })
    } else {
      let email = this.props.auth.getEmail()
      this.getCompanyData(this.userCompanyApi + email)
    }
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
    let companyData = <div>
        <div>Name: <input type="text" value={this.state.company.name} /></div><br />
        <fieldset>
          <legend>Address</legend>
          Suite: <input type="text" value={this.state.company.address.suite} /><br />
          Street number: <input type="text" value={this.state.company.address.streetNumber} /><br />
          Street name: <input type="text" value={this.state.company.address.streetName} /><br />
          City: <input type="text" value={this.state.company.address.city} /><br />
          Province: <input type="text" value={this.state.company.address.province} /><br />
          Country: <input type="text" value={this.state.company.address.country} />
        </fieldset><br />
        <div>Phone: <input type="text" value={this.state.company.phone} /></div>
        <div>Email: <input type="text" value={this.state.company.email} /></div>
      </div>

    return (
      <div>
        <form>
          <fieldset>
            <legend>Company Info</legend>
            {companyData}
          </fieldset>
        </form>
      </div>
    )
  }

  renderEmployeeData = () => {
    return (
      <div>
        <br />
        <form>
          <fieldset>
            <legend>Employee Data</legend>
            <p>Loading...</p>
          </fieldset>
        </form>
      </div>
    )
  }

  renderProductData = () => {
    return (
      <div>
        <br />
        <form>
          <fieldset>
            <legend>Product Data Section</legend>
            <p>Loading...</p>
          </fieldset>
        </form>
      </div>
    )
  }

  render() {
    if (Object.keys(this.state.company).length === 0) {
      return (
        <div>
          <p>Loading...</p>
          <button id="logout-button" onClick={this.props.logout}>Log out</button>
        </div>
      )
    }

    return (
      <div>
        <h1>{this.state.company.name}</h1>
        {/* <p>Hello {this.props.auth.getDisplayName()}! You are not admin. No full access for you!</p> */}
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
