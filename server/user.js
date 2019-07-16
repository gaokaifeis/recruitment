const express = require('express')
const Router = express.Router()


const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function (req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  console.log('aaa')
  const {user, pwd, type} = req.body
  console.log(user, pwd, type)
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '该用户名易存在'})
    }
    User.create({user, pwd, type}, function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '用户创建失败'})
      }
      return res.json({code: 0})
    })
  })
})

Router.get('/info', function (req, res) {
  return res.json({code: 1})
})

module.exports = Router