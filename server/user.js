const express = require('express')
const utils = require('utility')



const model = require('./model')
const User = model.getModel('user')
const Router = express.Router()

const _filter = {pwd: 0, __v: 0}

Router.get('/list', function (req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '该用户名已存在'})
    }

    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '用户创建失败'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.post('/login', function (req, res) {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter,  function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户不存在或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.get('/info', function (req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

module.exports = Router



function md5Pwd(pwd) {
  const salt = 'imooc_is_good_3957x8yza6dfhjkdhgjhyui'
  return utils.md5(utils.md5(pwd + salt))
}