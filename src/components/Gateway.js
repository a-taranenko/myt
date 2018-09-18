import React, { Component } from 'react'
import Main from './Main'
import CompanyDashboard from './CompanyDashboard'
import './../styling/Main.css'

class Gateway extends Component {
  constructor(props) {
    super(props)

    this.state = {
      company: {}
    }
  }

  componentDidMount = () => {
    // run getCompanyData
  }

  getCompanyData = () => {
    // fetch the correct company (plus employee/product data) based on the user\
    // change state so that CompanyDashboard could be rendered
  }

  renderCompanyDashboard = () => {
    // if (Object.keys(this.state.company).length === 0) return null

    return (
      <CompanyDashboard logout={this.props.logout}
                        auth={this.props.auth}>
      </CompanyDashboard>
    )
  }

  render() {
    if (this.props.auth.hasRole('admin')) return ( <Main logout={this.props.logout} auth={this.props.auth}></Main> )

    return this.renderCompanyDashboard()
  }
}

export default Gateway
