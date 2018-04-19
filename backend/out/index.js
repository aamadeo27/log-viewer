const Koa = require('koa2')
const Router = require('koa-router')
const static = require('koa-static')
const cors = require('koa2-cors')
const qs = require('koa-qs')
const path = require('path')
const fs = require('fs')

const dir = require('./dir')

const router = new Router()
const app = qs(new Koa())
app.use(require('koa-body')())

const UI_HOST = "http://10.150.55.146:3000"
const APP_PORT = 8087
const ROOT_DIR = __dirname + "/public"
const LOG_DIR = ROOT_DIR + "/log"

app.use(cors({
    origin: UI_HOST,
    allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}))


app.use(static(ROOT_DIR))

router.get('/logs', async ctx => {
    ctx.body = await dir.list(LOG_DIR)
})

app.use(router.routes())

app.listen(APP_PORT, () => {
    console.log(`log-viewer is running in port ${APP_PORT} pid ${process.pid}`)
})