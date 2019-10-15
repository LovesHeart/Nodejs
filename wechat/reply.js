const {resolve}=require('path')//然后这个resolve我们来引入一下
exports.reply = async (ctx, next) => {
    const message = ctx.weixin

    let mp=require('./index')//省略index.js/json写法
    let cilent=mp.getWechat()//拿到这个实例
    //那么现在我们去封装一下getWechat方法

    //为什么我把getWechat方法放在reply里面而不是外面
    //原因是每个人与我们交互时都是独立的用户
    //他每次发请求都会进入reply这个中间件里去
    //然后我们中间件在执行的这个时候再去拿微信的实例才能拿到最新的token票据信息
    //放在最外面相当于实例在整个后台服务共享
    //也就是说文件被加载服务启用时才会去调用获取实例的方法
    //那么拿到token可能会过期

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
        } else if (content === '4') {
            //现在拿到了cilent就可以调用它的handle方法
            let data=await cilent.handle('uploadMaterial','image',resolve(__dirname,'../1.jpg'))//我们这里可用通过path.resolve
            //当前的目录,向上追溯到2.jpg
            //首先声明一个data 然后要去调用刚才的uploadMeterial方法
            //但是我们要先拿到微信的实例(因为刚才的方法写在wechat-lib里,是微信实例才可以调用的方法))
            //现在reply里面还没有我们需要引入一下
            reply={
                type:'image',
                mediaId:data.media_id
            }
        }else if (content === '5') {
            //现在拿到了cilent就可以调用它的handle方法
            let data=await cilent.handle('uploadMaterial','video',resolve(__dirname,'../1.mp4'))//我们这里可用通过path.resolve
            //当前的目录,向上追溯到2.jpg
            //首先声明一个data 然后要去调用刚才的uploadMeterial方法
            //但是我们要先拿到微信的实例(因为刚才的方法写在wechat-lib里,是微信实例才可以调用的方法))
            //现在reply里面还没有我们需要引入一下
            reply={
                type:'video',
                title:'video',
                description:'大哥篮球玩玩',
                mediaId:data.media_id
            }
        }
        ctx.body = reply
    }

    console.log('this')
    console.log(this)

    await next()
}
//我们只是封装了一个专门处理上传素材的方法叫做uploadMetarial
//同时利用一个handle方法来接管所有的类似这种接口调用的方法
//但还是很容易出错：
//①拼接form表单出错（缺属性） 
//调用handle入参的顺序和值 //拼接视频的路径