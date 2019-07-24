import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {

  static propTypes = {
    userlist: propTypes.array.isRequired
  }

  handleClick (v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render () {
    return (
      <WingBlank>
        <WhiteSpace />
        {
          this.props.userlist.map(v => (
            v.avatar ? <Card key={v.user} onClick={() => this.handleClick(v)}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              ></Card.Header>
              <Card.Body>
                {v.type === 'boss' ? <div>公司{v.company}</div> : null}
                {v.desc.split('\n').map(content => (
                  <div key={content}>{content}</div>
                ))}
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
              </Card.Body>
            </Card> : null
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard
