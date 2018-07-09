import React from 'react'
import router from '../../router'
export default class View extends React.Component {
  render () {
    return (
      <div>
        Admin Page.
        <p>
          <router.link to="/admin">Dashboard</router.link>
          <router.link to="/admin/404">404</router.link>
        </p>
        <div><router.view name="admin-view" /></div>
      </div>
    )
  }
}
