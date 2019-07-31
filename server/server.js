const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

const model = require('./model')
const Chat = model.getModel('chat')

const app = express()

// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user login')
  socket.on('sendMsg', ({from, to, msg}) => {
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // io.emit('recvmsg', data)
    // console.log(data)
  })
})


const userRouter = require('./user')

//  解析cookie中间件
app.use(cookieParser())
// 解析post请求中body数据中间件
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))


server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
