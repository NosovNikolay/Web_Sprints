const fs = require('fs')
const util = require("util");

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

module.exports = {
    readFile,
    writeFile,
    any2array,
    interpolate,
    interpolateFile,
    showObj
}
