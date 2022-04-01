const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
    //procces.env.PORT
const port = 8000

http
    .createServer((req, res) => {
        const filePath = path.join(
            __dirname,
            req.url === '/' ? 'index.html' : req.url
        )
        fs.readFile(filePath, (err, text) => {
            if (err) {
                res.writeHeader(400, {})
                res.end()
                return
            }
            res.writeHeader(200, {
                //
                'Content-Type': `${path.extname(filePath).slice(1)}`,
            })
            res.write(text)
            res.end()
        })
    })
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })