import React from 'react'
import router from './router'


export default class App extends React.Component {
  render () {
    console.log(process.env)
    return (
      <div>
        <p>wellcome !</p>
        {/*<RouterView />*/}
        <router.view />
      </div>
    )
  }
}
