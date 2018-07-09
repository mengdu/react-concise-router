import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
// import RouterWrapper from './router-wrapper'

function makeRoute (route) {
  // {/*render={(props) => <RouterWrapper {...props}>{route.component}</RouterWrapper>}*/}
  return (
    <Route
      exact={route.exact}
      path={route.path}
      key={route.name ? route.name : route.path}
      component={route.component}
      />
  )
}

/**
* @param {string} path 路径
* @return {string} 返回连接路径
**/
function reslove () {
  let paths = []
  for (let i in arguments) {
    paths.push(arguments[i].replace(/^\s*|\s*$/g, '').replace(/^\//, ''))
  }
  return paths.join('/')
}

export default class Router {
  constructor (router) {
    let routes = router.routes
    this.routerMap = {
      'default': []
    }

    for (let i in routes) {
      if (Array.isArray(routes[i].children)) {
        this.routerMap['default'].unshift(makeRoute({...routes[i], exact: false}))
        this.routerMap[routes[i].name] = []
        for (let j in routes[i].children) {
          let child = routes[i].children[j]
          let path = ''
          // 非404页面需要处理下路径
          if (child.path && child.path !== '*') {
            path = reslove('/', routes[i].path, routes[i].children[j].path)
          }
          this.routerMap[routes[i].name].push(makeRoute({
            ...routes[i].children[j],
            exact: true,
            path: path
          }))
        }
      } else {
        this.routerMap['default'].push(makeRoute({...routes[i], exact: true}))
      }
    }
  }

  get link () {
    return (props) => {
      return <Link to={props.to}>{props.children}</Link>
    }
  }

  get view () {
    return (props) => {
      const name = props.name || 'default'
      if (!this.routerMap[name]) throw new Error('The view name `' + name + '` is not defined.')
      let that = this
      if (name === 'default') {
        return (
          <BrowserRouter>
            <Switch>
              {that.routerMap[name]}
            </Switch>
          </BrowserRouter>
        )
      }
      return (
        <Switch>
          {that.routerMap[name]}
        </Switch>
      )
    }
  }
}
