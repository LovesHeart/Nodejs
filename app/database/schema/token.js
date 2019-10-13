//在token.js里声明整个token的数据模型
//schema 文档,用来描述数据里有哪些字段,每个字段类型是什么
// model 代表了这类数据的数据模型
//entity 一条数据实体/实体
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema=new Schema({//为当前Token的Schema
    name:String,//accessToken
    token:String,
    expire_in:Number,//时间戳
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})
//Token的Schema就创建好了
//然后给它增加一个前置的方法或者说是中间件方法
TokenSchema.pre('save', function(next){
    // 每一条数据存储之前,我们都让它来执行这个方法
    if(this.isNew){//如果这条数据是新增的
        this.meta.createdAt=this.meta.updatedAt=Date.now()
    }else{
        this.meta.updatedAt=Date.now()//如果是一条存在的数据,只更新它的更新时间
    }

    next()//最后调用next()往下走 
})

//建好TokenSchema后我们还可以继续为TokenSchema增加一些静态方法
TokenSchema.statics={
    async getAccessToken(){
        //很简单,首先查一下
        const token=await this.findOne({
            name:'access_token'
        })
        //如果查到了并且token里面的这个值存在的话
        if(token&&token.token){
            token.access_token=token.token
        }

        return token
    },

    async saveAccessToken(data){
        //很简单,首先查一下
        const token=await this.findOne({
            name:'access_token'
        })
        //如果查到了
        if(token){
            token.token=data.access_token
            token.expire_in=data.expire_in
        }else{
            //如果没有，创建一个Token的实体也就是entity
            token=new Token({
                name:'access_token',
                token:data.access_token,
                expire_in:data.expire_in//过期时间
            })
        }

//无论token存在与否,都修改这个token，那么调用
        await token.save()//保存这个token

        return data//保存后返回data即可
    }
}

const Token = mongoose.model('Token',TokenSchema)
//第一个参数传入这个数据模型的名字就是Token,第二个参数就是根据什么Schema来创建这个数据模型