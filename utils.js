const { promisify } = require('util')
const fs = require('fs')

const readFileAsync = promisify(fs.readFile)
const existAsync = promisify(fs.exists)
const writeFileAsync = promisify(fs.writeFile)
const unlinkAsync = promisify(fs.unlink)

module.exports = {
  readFileAsync,
  existAsync,
  writeFileAsync,
  unlinkAsync
}
