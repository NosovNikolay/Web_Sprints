const fs = require('fs')
const util = require('util')
const { FILE_TYPES } = require('./constants')

const readFile = async filename =>
  new Promise((res, rej) =>
    fs.readFile(filename, 'utf8', (err, data) =>
      err ? rej(err) : res(data)))

const writeFile = async (filename, data) =>
  new Promise((res, rej) =>
    fs.writeFile(filename, data, err => err ? rej(err) : res(null)))

const any2array = data => {
  if (Array.isArray(data)) return data
  if (!data) return []
  return [data]
}

const interpolate = (str, data) => Object.entries(data).reduce((acc, [k, v]) => acc.replaceAll(`{{${k}}}`, v), str)

const interpolateFile = async (filename, data) => interpolate(await readFile(filename), data)

const showObj = obj => console.log(util.inspect(obj?.toObject ? obj.toObject() : obj, false, null, true))

const html2innerText = html => html.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const js2html = obj => obj ? '<div class="value object">' + Object.entries(obj).map(([k, v]) => {
  switch (typeof v) {
    case 'number':
      return `<div class="key">${k}</div><div class="value number">${v}</div>`
    case 'string':
      return `<div class="key">${k}</div><div class="value string">${html2innerText(v)}</div>`
    case 'object':
      return `<div class="key">${k}</div><div></div>${js2html(v)}`
  }
}).join('\n') + '</div>' : '<div class="value null">null</div>'

const getFileTypeByExt = ext => FILE_TYPES[ext.replace(/^\./, '')]

module.exports = {
  readFile,
  writeFile,
  any2array,
  interpolate,
  interpolateFile,
  showObj,
  js2html,
  getFileTypeByExt
}
