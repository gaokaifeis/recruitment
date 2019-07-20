import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'

import NavLinkBar from '../navlink'

import Boss from '../boss'

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
    const { type } = this.props
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: type === 'boss'
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
        <NavBar className='fixd-header' mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {
              navList.map(v => (
                <Route key={v.path} path={v.path} component={v.component} ></Route>
              ))
            }
          </Switch>
        </div>

        <NavLinkBar data={navList} />
      </>
    )
  }
}

export default Dashboard
