<<<<<<< HEAD
=======
const fs = require('fs')
>>>>>>> newbranch
const request = require('request-promise')
//我们借助这个request的库来发送请求
const base = 'https://api.weixin.qq.com/cgi-bin/'

const api = {
<<<<<<< HEAD
    accessToken: base + 'token?grant_type=client_credential'
=======
    accessToken: base + 'token?grant_type=client_credential',
    temporary:{
        upload:base+'media/upload?'
    }
>>>>>>> newbranch
}

module.exports = class Wechat {
    //这个类所做的事情就是能接收到外面实例化时传入的参数，然后里面有个ID和Secret
    //然后默认会去发出Token请求，在request时会拼接上相应的appID还有Secret，写成这个请求的url地址
    //然后再请求到token之后修改token的有效时间，返回最终修改后的Token的data数据
    //在头部我们也做了封装,就是把这个URL地址，把它给拆解开，成一个通用的base地址，拼接上某一个api的这个属性名字对应的一个路径
    //然后再具体到请求之前，我们还会把它拼接上相应的appID还有Secret
    //那么怎么调用呢,我们在wechat文件夹里面再新建一个文件叫做index.js
    constructor(opts) {


        this.opts = Object.assign({}, opts)
        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken=opts.getAccessToken
        this.saveAccessToken=opts.saveAccessToken

        this.fetchAccessToken()
    }

    async request(options) {
        // 传入的POST表单或者GET的一个参数串
            options=Object.assign({},options,{
                 json:true

            })//以及给他追加一个json为true的参数
        //我们默认这里获取的是json数据,然后尝试发送请求
            try{
                // console.log('options.url')
                // console.log('options.url')
                // console.log(options.url)
                const res = await request(options)
                // console.log('res res res res res res ')
<<<<<<< HEAD
                console.log(res)
=======
                // console.log(res)
>>>>>>> newbranch
                return res
            }//捕获异常 直接打印异常
            catch(err){
                console.log(err)
            }
        
        // var request = require('request');
        // request(options.url, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body) // 请求成功的处理逻辑
        //     console.log('I have came here :: inside')
        // }
        //     console.log('I have came here')
        //     if(error)
        //     console.log(options.url)
        //     console.log(error)
        // });
    }


    async fetchAccessToken() {
        let data

        // if (this.getAccessToken) {
        //     data = await this.getAccessToken()
        // }//这是额外增加的检查就看这个方法存不存在阿

        if (!(this.isValidToken(data))) {
            data = await this.updateAccessToken()
        }

        await this.saveAccessToken(data)

        return data
    }

    async updateAccessToken() {
        const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`
        // console.log('url url url url url url ')
        // console.log(url)
        //拼接完URL地址后发出一个请求
        const data = await this.request({ url })
<<<<<<< HEAD
        // console.log(data)
=======
        console.log(data)
>>>>>>> newbranch
        const now = new Date().getTime()
        const expiresIn = now + (data.expires_in - 20) * 1000//now的单位是ms -20得s *1000得ms

        data.expires_in = expiresIn

        return data
    }

    isValidToken(data) {
        if(!data||!data.expires_in){
            return false
        }

        const expiresIn=data.expires_in
        const now=new Date().getTime()

        if(now<expiresIn){
            return true
        }else {
            return false
        }

        //在业务的wechat目录下
    }

<<<<<<< HEAD

=======
    uploadMaterial(token,type, material, permanent=false){
        let form={}
        let url=api.temporary.upload

        if(permanent){//继续构建表单

        }
        form.media=fs.createReadStream(material)//创建一个读文件的流//传入material:文件路径//就知道你material要写成meterial.c
        //拼接上传地址
        
        let uploadUrl=`${url}access_token=${token}&type=${type}`

        const options = {
            method:'POST',
            url:uploadUrl,
            json:true,
            formData:form
        }//这里可以这样写json的options:加formData:form
        //这里少了一个动作，把form表单拼装上去

        return options
    }
//封装成一个通用的函数
    async handle(opration,...args)//opration为方法名//通过这种写法可以传入多个参数
    {
        const tokenData=await this.fetchAccessToken()
        const options=this[opration](tokenData.access_token,...args)//就是我们传入的方法名+传参
        const data=await this.request(options)

        return data
    }
>>>>>>> newbranch
}