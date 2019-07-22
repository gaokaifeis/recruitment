import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'



@connect(
  state => state.user
)
class User extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout () {
      const alert = Modal.alert
      alert('注销', '确认退出登陆吗', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => {
          browserCookie.erase('userid')
          this.props.history.push('/login')
        } },
      ])
    // browserCookie.erase('userid')
  }

  render () {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
          title={this.props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine={true}
          >
            {props.title}
            {
              props.desc.split('\n').map(v => (
                <Brief key={v}>{v}</Brief>
              ))
            }
            {
              props.money ? <Brief>薪资：{props.money}</Brief> : null
            }
            
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout} >退出登录</Item>
        </List>
      </div>
    ) : null
  }
}

export default User
