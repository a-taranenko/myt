import React, { Component } from 'react'
import Main from './Main'
import CompanyDashboard from './CompanyDashboard'
import './../styling/Main.css'

class Gateway extends Component {
  renderCompanyDashboard = () => {
    return (
      <CompanyDashboard company={null}
                        auth={this.props.auth}>
      </CompanyDashboard>
    )
  }

  render() {
    if (this.props.auth.hasRole('admin')) return ( <Main auth={this.props.auth}></Main> )

    return this.renderCompanyDashboard()
  }
}

export default Gateway
