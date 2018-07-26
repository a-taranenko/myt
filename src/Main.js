import React, {Component} from 'react'
import IntroScreen from './IntroScreen'
import Company from './Company'
import './styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: [],
      selectedCompany: [],
      selected: false,
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

  selectCompany = (index) => {
    this.setState({
      selected: true,
      selectedCompany: [...this.state.companies][index]
    })
  }

  deselectCompany = () => {
    this.setState({
      selected: false,
      selectedCompany: []
    })
  }

  renderCompany = () => {
    return (
      <Company company={this.state.selectedCompany}
               deselectCompany={this.deselectCompany}>
      </Company>
    )
  }

  renderIntroScreen = () => {
    return (
      <IntroScreen username={this.props.username}
                   logout={this.props.logout}
                   companies={this.state.companies}
                   selectCompany={this.selectCompany}>
      </IntroScreen>
    )
  }

  render() {
    return (this.state.selected ? this.renderCompany() : this.renderIntroScreen() )
  }
}

export default Main
