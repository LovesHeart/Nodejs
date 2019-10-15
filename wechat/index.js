<<<<<<< HEAD
=======
//對於wechat这个类进行了增强 让他里面可以调用外层../wechat-lib/传入的saveToken和getToken两个方法
//二：引入mongoose通过mongoose来创建了Token的数据模型
//然后这个数据模型我们就能够通过它上面的get或者是save静态方法来查询或者存储对应数据，前提都是先有通过Schema创建的model
//也就是说schema一定要初始化好，同时mongodb的服务要开启，数据库也要连接成功，那么流程才能跑通

>>>>>>> newbranch
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
<<<<<<< HEAD

            return res
        },
        getAccessToken: async(data)=>{
=======
//这里调用就是模型的静态方法
            return res
        },
        saveAccessToken: async(data)=>{
>>>>>>> newbranch
            const res = Token.saveAccessToken(data)

            return res
        }
        //那么这个Token怎么创建呢
        //我们会引入几个mongoose里面的概念
    }
}

<<<<<<< HEAD
;(async function(){
    const client=new Wechat(wechatCfg.wechat)
    //传参同时会发请求
})()
=======
exports.getWechat=()=>new Wechat(wechatCfg.wechat) //我们之前其实已经通过test来生成了一个client
    //传参同时会发请求   


>>>>>>> newbranch
