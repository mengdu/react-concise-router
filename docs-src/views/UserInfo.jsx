import React from 'react'
import Navbar from '../components/navbar'

export default class UserInfo extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <Navbar />
        <p>UserInfo Page</p>
      </div>
    )
  }
}
