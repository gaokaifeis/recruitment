const mongoose = require('mongoose')

// 连接
const db_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(db_URL, {useNewUrlParser: true})
mongoose.connection.on('connected', function() {
  console.log('mongo connect')
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    //  个人简介
    'desc': {type: String},
    // 职位名称
    'title': {type: String},
    //  如果你是BOSS 还有两个字段
    'compony': {type: String},
    'money': {type: String}
  },
  chat: {
    chatid: {type: String, require: true},
    from: {type: String, require: true},
    to: {type: String, require: true},
    read: {type: Boolean, default: false},
    content: {type: String, require: true, default: ''},
    create_time: {type: Number, default: new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel (name) {
    return mongoose.model(name)
  }
}

