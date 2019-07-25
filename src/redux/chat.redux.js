import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
//  读取信息开始，保证只执行一次
const MSG_RECV_ONCE = 'MSG_RECV_ONCE'
// 表示已读
const MSG_READ = 'MSG_READ'

const defaultState = {
  chatmsg: [],
  users: [],
  unread: 0,
  fetch: false
}

export function chat(state=defaultState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread:state.unread + n}
    case MSG_RECV_ONCE:
      return {...state, fetch: true}
    case MSG_READ:
      return {...state, chatmsg: state.chatmsg.map(v => {
        if (v.from === action.payload.from && v.to === action.payload.userid) {
          v.read = true
        }
        return v
      }), unread: state.unread - action.payload.num}
    default:
      return state
  }
}

function msgList (msgs, users, userid) {
  return {
    type: MSG_LIST,
    payload: {msgs, users, userid}
  }
}

function msgRecv (msg, userid) {
  return {
    type: MSG_RECV,
    payload: {msg, userid}
  }
}

function msgRecvOnce() {
  return {type: MSG_RECV_ONCE}
}

function msgRead ({from, userid, num}) {
  return {
    type: MSG_READ,
    payload: {from, userid, num}
  }
}

export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

export function recvMsg () {
  return (dispatch, getState) => {
    dispatch(msgRecvOnce())
    socket.on('recvmsg', data => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function readMsg (from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
    .then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({userid, from, num: res.data.num}))
      }
    })
  }
}
