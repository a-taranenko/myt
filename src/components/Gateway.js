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

  renderCompanyDashboard = () => {
    return (
      <CompanyDashboard company={null}
                        logout={this.props.logout}
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
