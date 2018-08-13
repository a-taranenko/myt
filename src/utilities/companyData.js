export const companyFieldObject = {
  type: '',
  name: '',
  email: '',
  phone: '',
  suite: '',
  streetNumber: '',
  streetName: '',
  city: '',
  province: '',
  country: ''
}

export function companyJsonConverter(newCompanyObject) {
  let companyJson = {}

  companyJson.type = 'company'
  companyJson.subType = newCompanyObject.type
  companyJson.name = newCompanyObject.name
  companyJson.email = newCompanyObject.email
  companyJson.phone = newCompanyObject.phone

  companyJson.address = {}
  companyJson.address.suite = newCompanyObject.suite
  companyJson.address.streetNumber = newCompanyObject.streetNumber
  companyJson.address.streetName = newCompanyObject.streetName
  companyJson.address.city = newCompanyObject.city
  companyJson.address.province = newCompanyObject.province
  companyJson.address.country = newCompanyObject.country

  companyJson.address.geo = {}
  companyJson.address.geo.lat = '10'
  companyJson.address.geo.lng = '10'

  return companyJson
}
