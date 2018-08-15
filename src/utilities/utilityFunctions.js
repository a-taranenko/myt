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

let proxyurl = process.env.REACT_APP_PROXY_URL
let fetchInit = {
  mode: 'cors',
  headers: {
    "Content-Type": "application/json"
  }
}

export const getData = (url) => {
  let fetchInitGet = { ...fetchInit, method: 'GET' }

  return (
    fetch(proxyurl + url, fetchInitGet)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response.json()

        let error = new Error(response.statusText || response.status)
        throw error
      })
  )
}

export const postData = (url, data) => {
  let fetchInitPost = { ...fetchInit, method: 'POST', body: JSON.stringify(data) }

  return (
    fetch(proxyurl + url, fetchInitPost)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response.json()

        let error = new Error(response.statusText || response.status)
        throw error
      })
  )
}
