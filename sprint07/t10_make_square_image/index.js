const Koa = require('koa')
const Router = require('koa-router')

const path = require('path')
const url = require('url')

const { PORT } = require('./constants')
const { readFile, getFileTypeByExt } = require('./utils')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = await readFile(path.join(__dirname, 'index.html'))
  ctx.set('Content-Type', getFileTypeByExt('html'))
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
