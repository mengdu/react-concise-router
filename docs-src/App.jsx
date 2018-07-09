import React from 'react'
import router from './router'

window.router = router

export default class App extends React.Component {
  render () {
    console.log(process.env)
    return (
      <div style={{textAlign: 'center'}}>
        <p>wellcome !</p>
        <router.view />
      </div>
    )
  }
}
