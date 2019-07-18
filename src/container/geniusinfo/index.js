import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { update } from '../../redux/user.redux'

import AvatarSelector from '../../components/avatarselector'

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            })
          }}
        />
        <InputItem
          onChange={(v) => this.onChange('title', v)}
        >
          应聘职位
        </InputItem>
        <TextareaItem
          title="个人简介"
          autoHeight
          rows={3}
          onChange={(v) => this.onChange('desc', v)}
        >
        </TextareaItem>
        <Button
          onClick={() => this.props.update(this.state)}
          type='primary'>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo
