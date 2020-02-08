const assert = require('assert')

const nameSorter = require('../name-sorter.js');
const { existAsync, readFileAsync, unlinkAsync } = require('../utils')

describe('Name Sorter', () => {
  const outFileName = './sorted-names-list.txt';
  before(async () => {
    if (await existAsync(outFileName)) {
      await unlinkAsync(outFileName)
    }
  })
  it('should sort names by last name and then by any given names', async () => {
    const fileName = './unsorted-names-list.txt';
    await nameSorter(fileName, outFileName)
    const fileContent = await readFileAsync(outFileName, { encoding: 'utf-8' })
    assert.deepStrictEqual(fileContent.split(/\r?\n/), ['Avie Annakin',
      'Hailey Annakin',
      'Erna Dorey Battelle',
      'Selle Bellison',
      'Flori Chaunce Franzel',
      'Orson Milka Iddins',
      'Odetta Sue Kaspar',
      'Roy Ketti Kopfen',
      'Madel Bordie Mapplebeck',
      'Debra Micheli',
      'Leonerd Adda Micheli Monaghan',
      'Leonerd Adda Mitchell Monaghan'
    ])
  });
});