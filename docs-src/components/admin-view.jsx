import React from 'react'
import { NavLink } from 'react-router-dom'
import router from '../router'

export default class View extends React.Component {
  render () {
    return (
      <div>
        Admin Page.
        <div style={{ padding: '15px' }}>
          <NavLink to="/" activeClassName="link-active" exact>Home</NavLink>
          <NavLink to="/admin" activeClassName="link-active" exact>Dashboard</NavLink>
          <NavLink to="/admin/page1" activeClassName="link-active" exact>page1</NavLink>
          <NavLink to="/admin/page2" activeClassName="link-active" exact>page2</NavLink>
          <NavLink to="/admin/page3" activeClassName="link-active" exact>page3</NavLink>
          <NavLink to="/admin/other" activeClassName="link-active" exact>404</NavLink>
        </div>
        <div>{router.view('admin-view')}</div>
      </div>
    )
  }
}
