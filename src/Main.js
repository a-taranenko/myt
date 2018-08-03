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
    let self = this

    let proxyurl = 'https://cors-anywhere.herokuapp.com/'
    let url = 'https://myt-world.localtunnel.me/api/v1/companies'

    fetch(proxyurl + url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log(response)
      if (response.status === 404) {
        let error = new Error(`could not connect to ${url}`)
        throw error
      }
      return response.json()
    }).then(json => {
        if (json.status === 'success') {
          self.setState({
            companies: [...json.data]
          })
        } else {
          // throw error with a proper message
        }
    }).catch((error) => {
        self.setState({
          companies: []
        })
        console.log(error)
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
