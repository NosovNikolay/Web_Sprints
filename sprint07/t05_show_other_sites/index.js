const Koa = require('koa')
const Router = require('koa-router')

const axios = require('axios')
const cheerio = require('cheerio')

const { PORT } = require('./constants')
const { interpolateFile } = require('./utils')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = await interpolateFile('index.html', { body: '', url: '<h3>Type a URL</h3>' })
})

router.get('/search', async ctx => {
  const search = ctx.request.query.search ?? ''
  const res = await axios.get(search).catch(() => null)
  let body = '<h3>Not found</h3>'
  if (res) {
    body = `<body>\n${cheerio.load(res.data, {})('body').html()}</body>`.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  }
  ctx.body = await interpolateFile('index.html', { body, url: search })
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
  })
