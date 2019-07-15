const express = require('express')
const mongoose = require('mongoose')


// 连接
const db_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(db_URL, {useNewUrlParser: true})
mongoose.connection.on('connected', function() {
  console.log('mongo connect')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}))

// User.create({
//   user: '小华',
//   age: 18
// }, function(err, doc) {
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

User.update({user: '小华'}, {'$set': {age: 26}}, function(err, doc) {
  console.log(doc)
})

const app = express()

app.get('/data', function(req, res) {
  User.find({}, function(err, doc) {
    res.json(doc)
  })
})

app.get('/delete', function(req, res) {
  User.remove({user: '小明'}, function(err, doc) {
    res.json({success: 'OK'})
  })
})

app.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>')
})

app.listen(9093, function() {
  console.log('Node app start at port 9093')
})
