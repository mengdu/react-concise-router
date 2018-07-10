import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch, Link} from 'react-router-dom'
// import RouterWrapper from './router-wrapper'
import {reslove, compileString, objectToQueryString} from './utils'

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

export default class Router {
  constructor (router) {
    let routes = router.routes
    this.routes = []
    if (router.mode && ['hash', 'history'].indexOf(router.mode.toLocaleLowerCase()) === -1) {
      throw new Error('The router.mode value must be \'hash\' or \'history\'.')
    }
    this.mode = router.mode || 'history'
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
          this.routes.push({...child, path})
          this.routerMap[routes[i].name].push(makeRoute({
            ...routes[i].children[j],
            exact: true,
            path: path
          }))
        }
      } else {
        this.routes.push(routes[i])
        this.routerMap['default'].push(makeRoute({...routes[i], exact: true}))
      }
    }
  }

  /**
  * 路由出口
  * e.g: <router.link to="/">Link</router.link>
  * @props {string|object} to 同Link
  **/
  get link () {
    return (props) => {
      return <Link to={props.to}>{props.children}</Link>
    }
  }

  /**
  * 路由出口
  * e.g: <router.view />
  * @props {string} name 子路由名称，默认default，根路由
  **/
  get view () {
    return (props) => {
      const name = props.name || 'default'
      if (!this.routerMap[name]) throw new Error('The view name `' + name + '` is not defined.')
      let that = this
      if (name === 'default') {
        if (this.mode === 'hash') {
          return (
            <HashRouter>
              <Switch>
                {that.routerMap[name]}
              </Switch>
            </HashRouter>
          )
        } else {
          return (
            <BrowserRouter>
              <Switch>
                {that.routerMap[name]}
              </Switch>
            </BrowserRouter>
          )
        }
      }
      return (
        <Switch>
          {that.routerMap[name]}
        </Switch>
      )
    }
  }
  
  /**
  * 生成push函数参数
  * @param {object} args
  * @param {string} args.name 路由名称
  * @param {string} args.path 路由
  * @param {object} args.query 查询参数对象
  * @param {object} args.params 路由参数
  * @param {string} args.hash hash值
  * @return {string} 返回url
  **/
  route (args) {
    if (!args || typeof args !== 'object') {
      throw new Error('The arguments[0] must be an object.')
    }
    let {params, query, hash, path, name} = args
    if (name) {
      let route = this.routes.filter(e => e.name === name)[0]
      if (!route) throw new Error('The name \'' + name + '\' is not found in route list.')
      path = route.path
    }
    path = compileString(path)(params)
    const queryString = query ? ('?' + objectToQueryString(query)) : ''
    hash = hash ? ('#' + hash) : ''

    return `${path}${queryString}${hash}`
  }
}
