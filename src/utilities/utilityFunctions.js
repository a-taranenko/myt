function isUpperCase(letter) {
  if (letter === letter.toUpperCase()) return true
}

export function getFieldName(field) {
  let updatedField = field.charAt(0).toUpperCase() + field.substring(1, field.length)
  let previousUpperCaseIndex = 0
  let upperCaseFields = []

  updatedField.split('').forEach((letter, index) => {
    if (isUpperCase(letter) && index !== 0) {
      upperCaseFields.push(updatedField.substring(previousUpperCaseIndex, index))

      previousUpperCaseIndex = index
    }
  })

  if (upperCaseFields.length === 0) return updatedField

  upperCaseFields.push(updatedField.substring(previousUpperCaseIndex, updatedField.length))
  return upperCaseFields.join(' ')
}

export const getData = (url) => {
  let proxyurl = 'https://cors-anywhere.herokuapp.com/'

  return (
    fetch(proxyurl + url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 404) {
        let error = new Error(`could not connect to ${url}`)
        throw error
      }
      return response.json()
    }).catch(error => {throw error})
  )
}

export const postData = (url, data) => {
  let proxyurl = 'https://cors-anywhere.herokuapp.com/'

  return (
    fetch(proxyurl + url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 404) {
        let error = new Error(`could not connect to ${url}`)
        throw error
      }
      return response.json()
    }).catch(error => { throw error })
  )
}
