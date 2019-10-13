exports.reply = async (ctx, next) => {
    const message = ctx.weixin

    console.log('ctx.weixin')
    console.log(ctx.weixin)


    if (message.MsgType === 'text') {
        let content = message.Content
        let reply = 'Oh, 你说的' + content + '太复杂了，无法解析'

        if (content === '1') {
            reply = 'The best'
        } else if (content === '2') {
            reply = '吃豆腐'
        } else if (content === '3') {
            reply = '天下第三吃咸蛋'
        } else if (content === 'imooc') {
            reply = 'iimooc'
        }
        ctx.body = reply
    }

    console.log('this')
    console.log(this)

    await next()
}