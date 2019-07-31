import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import http from 'http'
import SocketIo from 'socket.io'

import model from './model'

// import csshook from 'css-modules-require-hook/preset'
// import assethook from 'asset-require-hook'

// import React from 'react'
// import { StaticRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import { renderToStaticMarkup } from 'react-dom/server'

// import staticPath from '../build/asset-manifest.json'

// import App from '../src/App'
// import reducers from '../src/reducer'

// assethook({
//   extensions: ['png']
// })




const Chat = model.getModel('chat')

const app = express()

// work with express
const server = http.Server(app)

const io = SocketIo(server)

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

  // const store = createStore(reducers, compose(
  //   applyMiddleware(thunk)
  // ))
  // console.log(req.url)
  // let context = {}
  // const markup = renderToStaticMarkup(
  //   (
  //     <Provider store={store}>
  //       <StaticRouter
  //         location={req.url}
  //         context={context}
  //       >
  //         <App></App>
  //       </StaticRouter>
  //     </Provider>
  //   )
  // )
  // const pageHtlm = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1" />
  //     <meta name="theme-color" content="#000000" />
  //     <title>React App</title>
  //     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  //   </head>
  //   <body>
  //     <noscript>You need to enable JavaScript to run this app.</noscript>
  //     <div id="root">${markup}</div>
  //   </body>
  // </html>
  // `

  // res.send(pageHtlm)
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))


server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
