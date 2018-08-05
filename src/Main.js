import React, {Component} from 'react'
import SelectionScreen from './SelectionScreen'
import Company from './Company'
import {companyFieldObject} from './companyData'
import {companyJsonConverter} from './companyData'
import {getData} from './utilityFunctions'
import './styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: [],
      selectedCompany: [],
      selected: false,
      newCompany: companyFieldObject
    }
  }

  componentWillMount() {
    // The following is just temporary
    // Need to call db to get company data for the logged user
    // Should we also do a schema check?
    let self = this
    let url = 'https://myt-world.localtunnel.me/api/v1/companies'

    getData(url)
      .then(json => {
        if (json.status === 'success') {
          self.setState({
            companies: [...json.data]
          })
        } else {
          let error = new Error(`could not retrieve company data`)
          throw error
        }
      }).catch((error) => {
        self.setState({
          companies: []
        })
        console.log(error)
      })

    // self.setState({
    //   companies: [
    //     {
    //       id: "COMPANY::1",
    //       type: "company",
    //       subType: "restaurant",
    //       name: "Blue River Restaurant",
    //       email: "leo@blue_river.com",
    //       phone: "780-710-2550",
    //       address: {
    //         suite: "900",
    //         streetNumber: "214",
    //         streetName: "11 Avenue SW",
    //         city: "Calgary",
    //         province: "Alberta",
    //         country: "Canada",
    //         geo: {
    //           lat: "-9.117047399999999",
    //           lng: "38.7626105"
    //         }
    //       }
    //     },
    //     {
    //       id: "COMPANY::2",
    //       type: "company",
    //       subType: "restaurant",
    //       name: "Shawarma Chicken Ltd",
    //       email: "tantely@shawa_rma.com",
    //       phone: "403-710-2550",
    //       address: {
    //         suite: "900",
    //         streetNumber: "204",
    //         streetName: "11 Avenue SW",
    //         city: "Calgary",
    //         province: "Alberta",
    //         country: "Canada",
    //         geo: {
    //           lat: "-10.117047399999999",
    //           lng: "39.7626105"
    //         }
    //       }
    //     }
    //   ]
    // })
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

  deleteCompany = () => {

  }

  submitCompany = () => {
    let companyJson = companyJsonConverter(this.state.newCompany)
    let proxyurl = 'https://cors-anywhere.herokuapp.com/'
    let url = 'https://myt-world.localtunnel.me/api/v1/companies'
    let self = this

    fetch(proxyurl + url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companyJson)
    }).then(response => {
      if (response.status === 404) {
        let error = new Error(`could not connect to ${url}`)
        throw error
      }
      return response.json()
    }).then(json => {
      console.log(json)
      self.setState({
        newCompany: companyFieldObject
      })
    }).catch((error) => {
      self.setState({
        newCompany: companyFieldObject
      })
      console.log(error)
    })
  }

  handleInput = (input) => {
    let companyField = input.target.id
    let companyFieldData = input.target.value

    this.setState(prevState => ({
      newCompany: {
        ...prevState.newCompany,
        [companyField]: companyFieldData
      }
    }))
  }

  renderCompany = () => {
    return (
      <Company company={this.state.selectedCompany}
               role={this.props.role}
               deselectCompany={this.deselectCompany}>
      </Company>
    )
  }

  renderSelectionScreen = () => {
    return (
      <SelectionScreen username={this.props.username}
                   logout={this.props.logout}
                   companies={this.state.companies}
                   role={this.props.role}
                   selectCompany={this.selectCompany}
                   deleteCompany={this.deleteCompany}
                   handleInput={this.handleInput}
                   newCompany={this.state.newCompany}
                   submitCompany={this.submitCompany}>
      </SelectionScreen>
    )
  }

  render() {
    return (this.state.selected ? this.renderCompany() : this.renderSelectionScreen() )
  }
}

export default Main
