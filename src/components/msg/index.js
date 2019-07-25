import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'


@connect(
  state => state
)
class Msg extends Component {

  getLast (arr) {
    return arr[arr.length -1]
  }

  render () {
    if (!this.props.chat.chatmsg.length) {
      return null
    }
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    // 按照聊天用户分组，根据chatid
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] =  msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).create_time
      const bLast = this.getLast(b).create_time
      return bLast - aLast
    })
    return (
      <>
        {
          chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from
            
            const unreadNum = v.filter(v => !v.read && v.to === userid).length

            const name = userInfo[targetId] ? userInfo[targetId].name : ''
            const avatar = userInfo[targetId] ? userInfo[targetId].avatar : ''
            return (
              <List
                key = {lastItem._id}
              >
                <Item
                  extra={<Badge text={unreadNum} ></Badge>}
                  thumb={require(`../img/${avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </>
    )
  }
}

export default Msg
