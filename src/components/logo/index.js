import React, { Component } from 'react'
import logoImag from './job.png'
import './logo.css'

class Logo extends Component {
  render () {
    return (
      <div className="logo-container">
        <img src={logoImag} alt="" />
      </div>
    )
  }
}

export default Logo
