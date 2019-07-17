import axios from 'axios'

import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERRO_MEG = 'ERRO_MEG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const defaultState = {
  redirectTo: '',
  msg: '',
  isAuth: '',
  user: '',
  type: ''
}

export function user (state=defaultState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case ERRO_MEG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, msg: '', ...action.payload}
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

function registerSuccess (payload) {
  return {
    type: REGISTER_SUCCESS,
    payload
  }
}

function loginSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
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
        dispatch(registerSuccess({user, pwd, type}))
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
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
