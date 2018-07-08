import React from 'react'
import router from '../../router'
export default class View extends React.Component {
  render () {
    return (
      <div>
        Admin Router.
        <div><router.view name="admin-view" /></div>
      </div>
    )
  }
}
