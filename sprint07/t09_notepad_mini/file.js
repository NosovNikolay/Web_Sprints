const fs = require('fs')
const path = require('path')

const NotePad = require('./NotePad')

const saveNotePad = notePad => fs.writeFileSync(path.join(__dirname, notePad.filename), JSON.stringify(notePad, null, 2))

const loadNotePad = filename => {
  let data = { notes: [], filename }
  try {
    data = JSON.parse(fs.readFileSync(filename, 'utf8'))
  } catch {
  }
  return NotePad.fromObject(data, saveNotePad)
}

module.exports = {
  saveNotePad,
  loadNotePad,
}
