const path = require('path')
const os = require('os')
const { orderBy } = require('lodash')

const { readFileAsync, existAsync, writeFileAsync } = require('./utils')

const nameSorter = async (relativeFileName, relativeOutFileName = './sorted-names-list.txt') => {
  const filePath = path.resolve(__dirname, relativeFileName)

  if (!await existAsync(filePath)) throw new Error(`${relativeFileName} not exist`)

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
  // order that set first by last name, then by any given names
  const sortedNames = orderBy(unsortedNamesMapped, ['lastName', 'givenName'], ['asc', 'asc'])
  const sortedString = sortedNames.map(({ lastName, givenName }) => `${!givenName ? '' : givenName} ${lastName}`).join(os.EOL)
  const outFilePath = path.resolve(__dirname, relativeOutFileName)
  // Should result the sorted names to screen
  console.log(sortedString)
  // and also put the results into a file in the working directory called sorted-names-list.txt.
  await writeFileAsync(outFilePath, sortedString)
}

module.exports = nameSorter
