const Koa = require('koa')
const Router = require('koa-router')
const Json = require('koa-json')
const BodyParser = require('koa-bodyparser')

const path = require('path')
const url = require('url')

const { PORT } = require('./constants')
const { readFile, getFileTypeByExt } = require('./utils')

const Note = require('./Note')

const { loadNotePad } = require('./file')

const app = new Koa()
const router = new Router()

const notepad = loadNotePad('save.json')

router.get('/', async ctx => {
  ctx.body = await readFile(path.join(__dirname, 'index.html'))
  ctx.set('Content-Type', getFileTypeByExt('html'))
})

router.post('/note', async ctx => {
  const note = Note.fromObject(ctx.request.body)
  notepad.add(note)
  ctx.body = note.toJSON()
})

router.delete('/note/:id', async ctx => {
  const id = ctx.params.id
  notepad.remove(id)
  ctx.body = id
})

router.get('/note/:id', async ctx => {
  ctx.body = notepad.get(ctx.params.id)?.toJSON() ?? null
})

router.get('/notepad', async ctx => {
  ctx.body = notepad.toJSON()
})

app
  .use(Json())
  .use(BodyParser())
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
