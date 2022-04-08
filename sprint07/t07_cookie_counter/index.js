const Koa = require('koa')
const Router = require('koa-router')

const path = require('path')
const url = require('url')

const { PORT } = require('./constants')
const { interpolateFile, readFile, getFileTypeByExt } = require('./utils')

const app = new Koa()
const router = new Router()

const store = {}

router.get('/', async ctx => {
  const key = ctx.ip
  const curCookie = ctx.cookies.get('loadTimes')
  if (!curCookie) {
    store[key] = 0
    ctx.cookies.set('loadTimes', '1', { httpOnly: false, expires: new Date(new Date().getTime() + 60_000) })
  }
  store[key]++
  ctx.body = await interpolateFile('index.html', { number: store[key] })
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    await next()
    if (ctx.status !== 404) return
    try {
      const reqUrl = new url.URL(ctx.url, `${ctx.req.protocol}://${ctx.req.headers.host}`)
      ctx.body = await readFile(path.join(__dirname, reqUrl.pathname))
      ctx.set('Content-Type', getFileTypeByExt(path.extname(reqUrl.pathname)))
    } catch (err) {
    }
  })
  .listen(3000, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
  })
