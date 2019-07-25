import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'

import { getMsgList, recvMsg } from '../../redux/chat.redux'

import NavLinkBar from '../navlink'

import Boss from '../boss'
import Genius from '../genius'
import User from '../user'
import Msg from '../msg'

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends Component {

  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render () {
    const { type } = this.props.user
    const { pathname } = this.props.location
    if (pathname === '/') {
      return null
    }
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
      <div>
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
        {type ? <NavLinkBar data={navList} ></NavLinkBar> : null}
      </div>
    )
  }
}

export default Dashboard
