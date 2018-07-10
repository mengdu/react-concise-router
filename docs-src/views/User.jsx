import React from 'react'
import { Link } from 'react-router-dom'
import router from '../router'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <p>User Page</p>
        <p>
          <Link to="/" >Home</Link>
          <Link to="/user" >User</Link>
          <Link to={router.route({name: 'info', params: {userId: 10001}, query: {sort: 1}})} >UserInfo</Link>
          {/*<router.link to={{name: 'info', params: {userId: 10001}, query: {sort: 1}}} >UserInfo</router.link>*/}
          {/*<Link to="/404" >404</Link>*/}
          <router.link to="/404">404</router.link>
        </p>
      </div>
    )
  }
}
