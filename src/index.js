import path from 'path'
import Koa from 'koa'
import compose from 'koa-compose'
import koaBody from 'koa-body'
import json from 'koa-json'
import cors from '@koa/cors'
// 安全插件
import helmet from 'koa-helmet'
// 静态资源插件
import statics from 'koa-static'
import compress from 'koa-compress'

import router from './routes/routes'

const app = new Koa()

const isDevMode = (process.env.NODE_ENV === 'production') ? false : true

// koa-compose 集成中间件
const middleware = compose([
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    json({ pretty: false, param: 'pretty' }),
    helmet(),
    router()
])

if ( isDevMode ) {
    app.use(compress())
}

app.use(middleware)

app.listen(3000)