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

    // let self = this

    // fetch('https://myt-world.localtunnel.me/api/v1/companies')
    //   .then(response => response.json())
    //   .then(json => {
    //     if (json.status === 'success') {
    //       self.setState({
    //         companies: [...json.data]
    //       })
    //     } else {
    //       // throw error with a proper message
    //     }
    //   })
    //   .catch(error => error)

    let companies = [
      {
        name: 'Blue River Restaurant',
        address: {
          suite: '900',
          streetNumber: '2144',
          streetName: '11 Avenue SW',
          city: 'Calgary',
          province: 'Alberta',
          country: 'Canada'
        },
        phone: '780-710-2550',
        email: 'leo@blue_river.com'
      }
    ]

    let myt = {
      name: 'Shawarma Chicken Ltd',
      address: {
        suite: '900',
        streetNumber: '204',
        streetName: '11 Avenue SW',
        city: 'Calgary',
        province: 'Alberta',
        country: 'Canada'
      },
      phone: '403-710-2550',
      email: 'tantely@shawa_rma.com'
    }

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
