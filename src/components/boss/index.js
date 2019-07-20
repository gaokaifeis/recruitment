import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {

  componentDidMount () {
    this.props.getUserList('genius')
  }

  render () {
    return (
      <WingBlank>
        <WhiteSpace />
        {
          this.props.userlist.map(v => (
            v.avatar ? <Card key={v.user}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              ></Card.Header>
              <Card.Body>
                {v.desc.split('\n').map(content => (
                  <div key={content}>{content}</div>
                ))}
              </Card.Body>
            </Card> : null
          ))
        }
      </WingBlank>
    )
  }
}

export default Boss
