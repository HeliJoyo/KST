const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const os = require('os')
const { orderBy } = require('lodash')

const readFileAsync = promisify(fs.readFile)

const nameSorter = async (relativeFileName, relativeOutFileName) => {
  const filePath = path.resolve(__dirname, relativeFileName)
  const unsortedNames = await readFileAsync(filePath, { encoding: 'utf-8' })

  const unsortedNamesMapped = unsortedNames.split(os.EOL).map((unsortedName) => {
    const index = unsortedName.lastIndexOf(' ')
    let lastName = ''
    let givenName = ''

    if (index > 0) {
      lastName = unsortedName.slice(index).trim()
      givenName = unsortedName.slice(0, index).trim()
    } else {
      lastName = unsortedName.trim()
    }

    return { givenName, lastName }
  })

  const sortedNames = orderBy(unsortedNamesMapped, ['lastName', 'givenName'], ['asc', 'asc'])
  const sortedString = sortedNames.reduce((prev, sortedName) => {
    if (prev) {
      // only add line break if we already have prev value
      prev += os.EOL
    }
    return prev + `${(sortedName.givenName ? sortedName.givenName : '')} ${sortedName.lastName}`
  }, '')

  if (relativeOutFileName) {
    const writeFileAsync = promisify(fs.writeFile)
    const outFilePath = path.resolve(__dirname, relativeOutFileName)
    await writeFileAsync(outFilePath, sortedString)
  }
}

module.exports = nameSorter
