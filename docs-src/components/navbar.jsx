import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {
  return (
    <div>
      <NavLink to="/" activeClassName="link-active" exact>Home</NavLink>
      <NavLink to="/user" activeClassName="link-active" exact>User</NavLink>
      <NavLink to="/user/100" activeClassName="link-active" exact>UserInfo</NavLink>
      <NavLink to="/about" activeClassName="link-active" exact>About</NavLink>
      <NavLink to="/admin" activeClassName="link-active" exact>Admin</NavLink>
      <NavLink to="/404" activeClassName="link-active" exact>404</NavLink>
    </div>
  )
}
