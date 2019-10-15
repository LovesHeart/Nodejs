//在token.js里声明整个token的数据模型
//schema 文档,用来描述数据里有哪些字段,每个字段类型是什么
// model 代表了这类数据的数据模型
//entity 一条数据实体/实体

//上一节我们通过mongodb数据库来存储了票据信息
//而票据的数据结构是通过mongoose来进行定义的
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//mongoose下Schema这个构造函数来创建了一个定义模型的骨架
//在它里面我们增加了这条数据所需要的字段
//以及他们的数据类型和定义
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
TokenSchema.pre('save', function(next){//TokenSchema上面可以有一个preSave方法
    //就是在mongodb每一条数据存储之前都有一个中间件这样一个方法来判断当前数据上的校验规则之类的

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
        let token=await this.findOne({
            name:'access_token'
        })
        //如果查到了
        if(token){
            token.token=data.access_token
            token.expire_in=data.expire_in
        }else{
            //如果没有，创建一个Token的数据实体也就是entity
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
//生成模型(initSchema)后我们可以在任意位置通过mongoose来拿到这个model
//拿到model后可以通过model独有的statics静态方法来拿到一些数据对这些数据做一些更新操作
//然后在一条数据也就是数据实体entity 