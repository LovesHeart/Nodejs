const mongoose = require('mongoose')
//那这样我们先引入路径
const {resolve} = require('path')//拿到resolve
const glob=require('glob')

//连上数据库之后我们需要让mongoose知道有哪些schema可以创建数据模型，因为只有创建了数据模型我们才能用这个模型
//那这样我们需要再增加一个方法，初始化schema
exports.initSchema=()=>{
    //读进来每一个Schema文件
    //通过glob这么一个读文件的一个库，可以一个.sync(传入文件路径)
    //路径就是database里面的schema里
}



//通过exports暴露一个方法
//传入一个参数就是db
exports.connect = (db) => {
    //我们在这个里面来做连接数据库的这个工作
    //连接数据库本身是一个异步动作可能是0.1s,5s
    //我们可以返回一个promise来等待它执行完毕   
    return new Promise(resolve => {//我们这个reject没用到把它给删掉把//,666
        mongoose.connect(db)//直接连接db
        //同时对于mongoose.collection增加一个事件比如说'disconnect',在连接断开的时候我们比如说打印一个
        mongoose.connection.on('disconnect',()=>{
            console.log('数据库挂了吧少年')
        })
        //这个就是连接断开的时候

        //再增加一个连接失败的时候
        mongoose.connection.on('error',err=>{
            console.log(err)//直接打印连接失败的异常
        })
        //连接成功的时候open
        mongoose.connection.on('open',()=>{
            resolve()
            console.log('Mongodb connected')
        })
    })//这样一个非常简易的连接数据库的代码就实现了
}