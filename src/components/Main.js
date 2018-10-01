import React, {Component} from 'react'
import SelectionScreen from './SelectionScreen'
import Company from './Company'
import { companyFieldObject, companyJsonConverter } from './../utilities/companyData'
import { getData, postData } from './../utilities/utilityFunctions'
import { companiesApiEndpoint } from './../utilities/apiEndpointData'
import './../styling/Main.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companies: [],
      selectedCompany: [],
      selected: false,
      newCompany: companyFieldObject
    }
    this.companiesApi = companiesApiEndpoint
  }

  getCompanyData = (url) => {
    let self = this

    getData(url)
      .then(json => {
        if (json.status === 'success') {
          self.setState({ companies: [...json.data] })
        } else {
          let error = new Error(`could not retrieve company data`)
          throw error
        }
      }).catch((error) => {
        self.setState({ companies: [] })
        console.log(error)
      })
  }

  postCompanyData = (url, data) => {
    let self = this

    return (
      postData(url, data)
        .then(json => {
          if (json.status === 'success') {
            self.setState({ newCompany: companyFieldObject })
          } else {
            let error = new Error(`could not save company data`)
            throw error
          }
        }).catch((error) => {
          self.setState({ newCompany: companyFieldObject })
          console.log(error)
        })
    )
  }

  componentDidMount() {
    this.getCompanyData(this.companiesApi)
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

  deleteCompany = () => {

  }

  submitCompany = () => {
    let companyJson = companyJsonConverter(this.state.newCompany)

    this.postCompanyData(this.companiesApi, companyJson)
      .then(data => {
        this.getCompanyData(this.companiesApi)
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
               deselectCompany={this.deselectCompany}
               auth={this.props.auth}>
      </Company>
    )
  }

  renderSelectionScreen = () => {
    return (
      <SelectionScreen logout={this.props.logout}
                       companies={this.state.companies}
                       selectCompany={this.selectCompany}
                       deleteCompany={this.deleteCompany}
                       handleInput={this.handleInput}
                       newCompany={this.state.newCompany}
                       submitCompany={this.submitCompany}
                       auth={this.props.auth}>
      </SelectionScreen>
    )
  }

  render() {
    return (this.state.selected ? this.renderCompany() : this.renderSelectionScreen() )
  }
}

export default Main
