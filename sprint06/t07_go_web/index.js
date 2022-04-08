const http = require('http')
const path = require('path')

const ejs = require('ejs')

const normal = require('./normal-router')
const quantum = require('./quantum-router')

const hostname = 'localhost'
const port = 3000

http
  .createServer((req, res) => {
    res.writeHeader(200, { 'Content-Type': `text/html` })
    switch (req.url) {
      case '/normal':
        const time = normal.calculateTime()
        ejs.renderFile(
          path.join(__dirname, 'views/normal.ejs'),
          { time },
          {},
          (err, str) => {
            res.write(str)
            res.end()
          }
        )
        break
      case '/quantum':
        const quantumTime = quantum.calculateTime()
        ejs.renderFile(
          path.join(__dirname, 'views/quantum.ejs'),
          { quantumTime },
          {},
          (err, str) => {
            res.write(str)
            res.end()
          }
        )
        break

      default:
        ejs.renderFile(
          path.join(__dirname, 'views/index.ejs'),
          {},
          {},
          (err, str) => {
            res.write(str)
            res.end()
          }
        )
        break
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
