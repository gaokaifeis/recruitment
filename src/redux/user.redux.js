import axios from 'axios'

import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERRO_MEG = 'ERRO_MEG'

const LOAD_DATA = 'LOAD_DATA'

const defaultState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

export function user (state=defaultState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case ERRO_MEG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    default:
      return state
  }
}

function errorMsg (msg) {
  return {
    type: ERRO_MEG,
    msg
  }
}

function authSuccess (payload) {
  const {pwd, ...data} = payload
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function loadData (payload) {
  return {type: LOAD_DATA, payload}
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !repeatpwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function update (data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
