const express = require('express')
const utils = require('utility')



const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Router = express.Router()

const _filter = {pwd: 0, __v: 0}

Router.get('/list', function (req, res) {
  const { type } = req.query
  User.find({ type }, _filter, function(err, doc) {
    return res.json({code: 0, data: doc})
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

Router.post('/update', function (req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '用户未登录'})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type,
    }, body)
    return res.json({code: 0, data})
  })
})

Router.get('/getmsglist', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '用户未登录'})
  }
  User.find({}, (err, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: userid}, {to: userid}]}, (err, doc) => {
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  })
  // {'$or': [{from: userid, to: userid}]}
  
})

Router.post('/readmsg', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '用户未登录'})
  }
  const { from } = req.body
  Chat.update({from, to: userid, read: false}, {'$set': {read: true}}, {'multi': true}, (err, doc) => {
    if (!err) {
      return res.json({code: 0, num: doc.nModified})
    }
    return res.json({code: 1, msg: '修改失败'})
  })
})


module.exports = Router



function md5Pwd(pwd) {
  const salt = 'imooc_is_good_3957x8yza6dfhjkdhgjhyui'
  return utils.md5(utils.md5(pwd + salt))
}