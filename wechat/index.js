const Wechat=require('../wechat-lib')//index可以加也可以不加,在nodejs中,
//对于模块的处理,它读取模块时会默认读取文件夹下名字为index的js文件或者json文件
const config=require('../config/config')//首先拿到一个config
const mongoose = require('mongoose')
//然后通过mongoose来拿到Token的数据模型
const Token = mongoose.model('Token')

const wechatCfg={
    wechat:{
        appID:config.wechat.appID,
        appSecret:config.wechat.appSecret,
        token:config.wechat.token,
        getAccessToken: async()=>{
            //拿到模型后就可以通过这个Token来查找了
            const res = Token.getAccessToken()

            return res
        },
        getAccessToken: async(data)=>{
            const res = Token.saveAccessToken(data)

            return res
        }
        //那么这个Token怎么创建呢
        //我们会引入几个mongoose里面的概念
    }
}

;(async function(){
    const client=new Wechat(wechatCfg.wechat)
    //传参同时会发请求
})()