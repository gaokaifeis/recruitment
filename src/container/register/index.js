import React, { Component } from 'react'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'

import Logo from '../../components/logo'
import { register } from '../../redux/user.redux'


@connect(
  state => state.user,
  {register}
)
class Register extends Component {

  constructor(props) {
    super (props)
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatpwd: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister () {
    console.log(this.props)
    this.props.register(this.state)
  }

  render () {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => this.handleChange('user', v)}>用户</InputItem>
            <InputItem type='password' onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
            <InputItem type='password' onChange={(v) => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={(v) => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem 
              checked={this.state.type === 'boss'}
              onChange={(v) => this.handleChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
