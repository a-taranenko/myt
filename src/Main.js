import React, {Component} from 'react'
import SelectionScreen from './SelectionScreen'
import Company from './Company'
import { companyFieldObject, companyJsonConverter } from './companyData'
import { getData, postData } from './utilityFunctions'
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

  getCompanyData = (url) => {
    let self = this

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
  }

  postCompanyData = (url, data) => {
    let self = this

    return (
      postData(url, data)
        .then(json => {
          if (json.status === 'success') {
            self.setState({
              newCompany: companyFieldObject
            })
          } else {
            let error = new Error(`could not save company data`)
            throw error
          }
        }).catch((error) => {
          self.setState({
            newCompany: companyFieldObject
          })
          console.log(error)
        })
    )
  }

  componentWillMount() {
    // The following is just temporary
    // Need to call db to get company data for the logged user
    // Should we also do a schema check?

    this.getCompanyData('https://myt-world-restapi.herokuapp.com/api/v1/companies')
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
    let url = 'https://myt-world-restapi.herokuapp.com/api/v1/companies'

    this.postCompanyData(url, companyJson)
      .then(data => {
        this.getCompanyData(url)
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
