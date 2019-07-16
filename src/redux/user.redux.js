import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERRO_MEG = 'ERRO_MEG'

const defaultState = {
  msg: '',
  isAuth: '',
  user: '',
  pwd: '',
  type: ''
}

export function user (state=defaultState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: '', ...action.payload}
    case ERRO_MEG:
      return {...state, isAuth: false, msg: action.msg}
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

export function register({user, pwd, repeatpwd, type}) {
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