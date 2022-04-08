const path = require("path");
const fs = require("fs");

const DIR = path.join(__dirname, 'tmp')

try {
    fs.mkdirSync(DIR, {recursive: true})
} catch {
}

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

module.exports = {
    DIR,
    HOSTNAME,
    PORT
}
