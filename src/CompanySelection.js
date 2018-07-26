import React, { Component } from 'react'
// import './styling/Company.css'

class CompanySelection extends Component {
  selectCompany = () => {
    this.props.selectCompany(this.props.index)
  }

  render() {
    return (
      <p onClick={this.selectCompany}>{this.props.children}</p>
    )
  }
}

export default CompanySelection