const Koa = require('koa')
const wechat = require('./wechat-lib/middleware')
const config = require('./config/config')
const reply = require('./wechat/reply')

// 生成服务器实例
const app = new Koa()

// 加载认证中间件
// ctx是Koa的应用上下文
// next就是串联中间件的钩子函数
app.use(wechat((config.wechat),reply.reply))

console.log('reply 1')
console.log(reply)

app.listen(3007)

console.log('Listen : ' + 3007)