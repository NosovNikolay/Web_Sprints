const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000

http
    .createServer((req, res) => {
        fs.readFile(path.join(__dirname, req.url === '/' ? 'index.html' : req.url), (err, html) => {
            if (err) {
                console.log(err)
                res.writeHeader(400, {})
                res.end()
                return
            }
            res.writeHeader(200, { 'Content-Type': 'text/html' })
            res.write(html)
            res.end()
        })
    })
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })