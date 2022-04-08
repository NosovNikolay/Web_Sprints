const http = require('http')
const path = require('path')
const os = require('os')
const url = require('url');

const hostname = 'localhost'
const port = 3000

const nets = os.networkInterfaces()
const results = {}

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = []
      }
      results[name].push(net.address)
    }
  }
}

const ip = results.en0[0]

const server = http
  .createServer((req, res) => {
    console.log(path.basename(__filename))
    console.log(process.argv)
    console.log(ip)
    console.log(os.hostname())
    console.log('HTTP', req.httpVersion)
    console.log(req.method)
    console.log(req.headers['user-agent'])
    console.log(
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    )
    console.log(url.parse(req.url, true).query);
    res.end('hello')
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
