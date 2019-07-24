import React from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

function Fade (props) {
  return <Route render={({ location }) => {
    const wrapper = props.wrapper
    // location for react-transition-group
    return typeof wrapper === 'function' ? wrapper(props.children, location) : props.children
  }} />
}

export default function RouterView (props) {
  const router = props.router
  const name = props.name || 'default'

  if (!router.views[name]) throw new Error('The view name `' + name + '` is not defined.')

  const wrapper = router.wrappers[name]

  if (name === 'default') {
    if (router.mode === 'hash') {
      return (
        <HashRouter>
          <Fade wrapper={wrapper}><Switch key="switch1">{router.views[name]}</Switch></Fade>
        </HashRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Fade wrapper={wrapper}><Switch key="switch2">{router.views[name]}</Switch></Fade>
        </BrowserRouter>
      )
    }
  }

  return <Fade wrapper={wrapper}><Switch key="switch3">{router.views[name]}</Switch></Fade>
}
