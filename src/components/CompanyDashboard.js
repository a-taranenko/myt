import React, { Component } from 'react'
import { getData, putData } from './../utilities/utilityFunctions'
import { companiesApiEndpoint, userSpecificCompanyApiEndpoint } from './../utilities/apiEndpointData'

class CompanyDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      company: {},
      updating: true
    }
    this.companiesApiEndpoint = companiesApiEndpoint
    this.userCompanyApi = userSpecificCompanyApiEndpoint
  }

  componentDidMount() {
    if (this.props.company) {
      this.setState({
        company: this.props.company,
        updating: false
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
          self.setState({
            company: {...json.data},
            updating: false
          })
        } else {
          let error = new Error(`could not retrieve company data`)
          throw error
        }
      }).catch((error) => {
        self.setState({ company: {} })
        console.log(error)
      })
  }

  updateCompanyData = (url) => {
    let self = this

    this.setState({ updating: true })

    return (putData(url, this.state.company)
      .then(json => {
        if (json.status !== 'success') {
          let error = new Error(`could not update company data`)
          throw error
        }
      })
      .catch(error => {
        self.setState({ company: {} })
        console.log(error)
      })
    )
  }

  submitCompany = (e) => {
    e.preventDefault()

    let email = this.props.auth.getEmail()

    this.updateCompanyData(this.companiesApiEndpoint)
      .then(data => {
        if (this.props.auth.hasRole('admin')) {
          this.props.getUpdateCompanyData(this.companiesApiEndpoint)
            .then(() => {
              this.setState({ updating: false })
            })
        } else {
          this.getCompanyData(this.userCompanyApi + email)
        }
      })
  }

  handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    this.setState(prevState => ({
      company: {
        ...prevState.company,
        [name]: value
      }
    }))
  }

  handleChangeAddress = (event) => {
    let name = event.target.name
    let value = event.target.value

    this.setState(prevState => ({
      company: {
        ...prevState.company,
        address: {
          ...prevState.company.address,
          [name]: value
        }
      }
    }))
  }

  renderCompanyData = () => {
    let companyData = <div>
      <div>Name: <input type="text" name="name" value={this.state.company.name} onChange={this.handleChange} /></div><br />
      <fieldset>
        <legend>Address</legend>
        Suite: <input type="text" name="suite" value={this.state.company.address.suite} onChange={this.handleChangeAddress} /><br />
        Street number: <input type="text" name="streetNumber" value={this.state.company.address.streetNumber} onChange={this.handleChangeAddress} /><br />
        Street name: <input type="text" name="streetName" value={this.state.company.address.streetName} onChange={this.handleChangeAddress} /><br />
        City: <input type="text" name="city" value={this.state.company.address.city} onChange={this.handleChangeAddress} /><br />
        Province: <input type="text" name="province" value={this.state.company.address.province} onChange={this.handleChangeAddress} /><br />
        Country: <input type="text" name="country" value={this.state.company.address.country} onChange={this.handleChangeAddress} />
      </fieldset><br />
      <div>Phone: <input type="text" name="phone" value={this.state.company.phone} onChange={this.handleChange} /></div>
      <div>Email: <input type="text" name="email" value={this.state.company.email} onChange={this.handleChange} /></div>
    </div>

    return (
      <div>
        <form onSubmit={this.submitCompany}>
          <fieldset>
            <legend>Company Info</legend>
            {companyData}
            <br />
            <button>Update</button>
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
    if (this.state.updating) {
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
        {
          (this.props.auth.hasRole('owner') || this.props.auth.hasRole('admin')) && (
            this.renderCompanyData()
          )
        }
        {
          this.props.auth.hasPermission('create:employee') && (
            this.renderEmployeeData()
          )
        }
        {this.renderProductData()}
        {
          this.props.auth.hasRole('admin') && (
            <div><button id="deselect-company-button" onClick={this.props.deselectCompany}>Deselect</button><br /></div>
          )
        }
        <button id="logout-button" onClick={this.props.logout}>Log out</button>
      </div>
    )
  }
}

export default CompanyDashboard
