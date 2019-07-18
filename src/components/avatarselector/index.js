import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.text ? (<div>
      <span>已选择头像</span>
      <img style={{width:20}} src={this.state.icon} alt={this.state.text} />
      </div>) : <div>请选择头像</div>
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            activeStyle={false}
            columnNum={5}
            onClick={el => {
              this.setState(el)
              this.props.selectAvatar(el.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector
