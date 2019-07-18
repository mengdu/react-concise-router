import React from 'react'
// import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import router from './router'

window.router = router

export default class App extends React.Component {
  render () {
    // console.log(process.env)
    return (
      <div style={{textAlign: 'center'}}>
        <p>wellcome !</p>
        {/* <p>
          <iframe src="//ghbtns.com/github-btn.html?user=mengdu&amp;repo=react-concise-router&amp;type=star&amp;count=true" allowtransparency="true" frameBorder="0" scrolling="0" width="100" height="20" title="star"></iframe>
          <iframe src="//ghbtns.com/github-btn.html?user=mengdu&amp;repo=react-concise-router&amp;type=fork&amp;count=true" allowtransparency="true" frameBorder="0" scrolling="0" width="100" height="20" title="fork"></iframe>
        </p> */}
        
        <div className="demo-block">
          <router.view />
        </div>
      </div>
    )
  }
}
