import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink'

function Boss () {
  return <h2>Boss</h2>
}
function Genius () {
  return <h2>Genius</h2>
}
function Msg () {
  return <h2>Msg</h2>
}
function User () {
  return <h2>User</h2>
}

@connect(
  state => state.user,
  null
)
class Dashboard extends Component {

  render () {
    console.log(this.props.location.pathname)
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <>
        <NavBar mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <NavLink />
      </>
    )
  }
}

export default Dashboard
