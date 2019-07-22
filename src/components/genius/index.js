import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/chatuser.redux'
import USerCard from '../usercard'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends Component {

  componentDidMount () {
    this.props.getUserList('boss')
  }

  render () {
    const userlist = this.props.userlist
    return (
      <USerCard 
        userlist={userlist || []}
      />
    )
  }
}

export default Genius
