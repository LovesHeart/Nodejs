const mongoose = require('mongoose')
//那这样我们先引入路径
<<<<<<< HEAD
const {resolve} = require('path')//拿到resolve
const glob=require('glob')

//连上数据库之后我们需要让mongoose知道有哪些schema可以创建数据模型，因为只有创建了数据模型我们才能用这个模型
//那这样我们需要再增加一个方法，初始化schema
exports.initSchema=()=>{
    //读进来每一个Schema文件
    //通过glob这么一个读文件的一个库，可以一个.sync(传入文件路径)
    //路径就是database里面的schema里
=======
const { resolve } = require('path')//拿到resolve
const glob = require('glob')

mongoose.Promise = global.Promise

//连上数据库之后我们需要让mongoose知道有哪些schema可以创建数据模型，因为只有创建了数据模型我们才能用这个模型
//那这样我们需要再增加一个方法，初始化schema
exports.initSchemas = () => {
    //读进来每一个Schema文件
    //通过glob这么一个读文件的一个库，可以一个.sync(传入文件路径)
    //路径就是database里面的schema里
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)//然后通过forEach因为它一个数组对于每一个文件
    //那这里就是来拼接一下当前路径然后是同层的schema然后再拼接上任意深度或者层次的一个js文件
>>>>>>> newbranch
}



//通过exports暴露一个方法
//传入一个参数就是db
exports.connect = (db) => {
    //我们在这个里面来做连接数据库的这个工作
    //连接数据库本身是一个异步动作可能是0.1s,5s
    //我们可以返回一个promise来等待它执行完毕   
<<<<<<< HEAD
    return new Promise(resolve => {//我们这个reject没用到把它给删掉把//,666
        mongoose.connect(db)//直接连接db
        //同时对于mongoose.collection增加一个事件比如说'disconnect',在连接断开的时候我们比如说打印一个
        mongoose.connection.on('disconnect',()=>{
            console.log('数据库挂了吧少年')
=======
    let maxConnectTimes = 0

    return new Promise(resolve => {//我们这个reject没用到把它给删掉把//,666
        //本地开发mongoose状态设置为开发状态,便于开发,终端看数据的更新或者插入
        if(process.env.NODE_ENV!=='production')//通过进程上面的env上面的NODE_ENV环境变量
        {
            mongoose.set('debug',true)
        }
        mongoose.connect(db)//直接连接db
        //同时对于mongoose.collection增加一个事件比如说'disconnect',在连接断开的时候我们比如说打印一个

        mongoose.connection.on('disconnect', () => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.connect(db)//直接连接db
            }else{
                throw new Error('数据库挂了吧少年')//里面传入一个提示的文案,删掉之前的log
            }
>>>>>>> newbranch
        })
        //这个就是连接断开的时候

        //再增加一个连接失败的时候
<<<<<<< HEAD
        mongoose.connection.on('error',err=>{
            console.log(err)//直接打印连接失败的异常
        })
        //连接成功的时候open
        mongoose.connection.on('open',()=>{
=======
        mongoose.connection.on('error', err => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.connect(db)//直接连接db
            }else{
                throw new Error('数据库挂了吧少年')//里面传入一个提示的文案,删掉之前的log
            }
        })
        //连接成功的时候open
        mongoose.connection.on('open', () => {
>>>>>>> newbranch
            resolve()
            console.log('Mongodb connected')
        })
    })//这样一个非常简易的连接数据库的代码就实现了
}