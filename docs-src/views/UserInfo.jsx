import React from 'react'
import { Link } from 'react-router-dom'

export default class UserInfo extends React.Component {
  render () {
    return (
      <div>
        <p>UserInfo Page</p>
        <p>
          <Link to="/" >Home</Link>
          <Link to="/user" >User</Link>
          <Link to="/404" >404</Link>
        </p>
      </div>
    )
  }
}
