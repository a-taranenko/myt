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
    // Should we also do a schema check?
    let companies = [
      { companyName: 'CompOne', address: '123 Main St.', phone: '4035558888', email: 'contactus@one.com', employees: [], products: [] },
      { companyName: 'CompTwo', address: '456 Main St.', phone: '4035559999', email: 'contactus@two.com', employees: [], products: [] }
    ]
    let myt = { companyName: 'MyT', address: '123 Evergreen St.', phone: '4035551111', email: 'contactus@myt-world.com', employees: [], products: [] }
    if (this.props.role === 'admin') companies.push(myt)

    this.setState({
      companies: [...companies]
    })
  }

  selectCompany = (index) => {
    if (this.props.role !== 'admin') this.props.assignRole()

    this.setState({
      selected: true,
      selectedCompany: [...this.state.companies][index]
    })
  }

  deselectCompany = () => {
    if (this.props.role !== 'admin') this.props.stripRole()

    this.setState({
      selected: false,
      selectedCompany: []
    })
  }

  renderCompany = () => {
    return (
      <Company company={this.state.selectedCompany}
               role={this.props.role}
               deselectCompany={this.deselectCompany}>
      </Company>
    )
  }

  renderIntroScreen = () => {
    return (
      <IntroScreen username={this.props.username}
                   logout={this.props.logout}
                   companies={this.state.companies}
                   role={this.props.role}
                   selectCompany={this.selectCompany}>
      </IntroScreen>
    )
  }

  render() {
    return (this.state.selected ? this.renderCompany() : this.renderIntroScreen() )
  }
}

export default Main
