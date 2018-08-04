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