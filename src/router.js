import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import RouterWrapper from './router-wrapper'
import {resolve, compileString, objectToQueryString} from './utils'

function generateRoute (route, router) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      key={route.name ? route.name : route.path}
      strict={route.strict}
      sensitive={route.sensitive}
      render={(props) => {
        return (
          <RouterWrapper {...props} route={route} router={router}>
            {route.component}
          </RouterWrapper>
        )
      }}
      />
  )
}

export default class Router {
  constructor (options) {
    const routes = options.routes
    this.routes = options.routes

    if (options.mode && ['hash', 'history'].indexOf(options.mode.toLocaleLowerCase()) === -1) {
      throw new Error('The options.mode value must be \'hash\' or \'history\'.')
    }

    this.mode = options.mode || 'history'

    // 存视图
    this.views = {
      'default': []
    }

    // 存过渡定义
    this.transitions = {
      'default': options.wrapper
    }

    // 构造 views
    for (let i = 0; i < routes.length; i++) {
      if (Array.isArray(routes[i].children)) {
        // 路由视图要禁用完全匹配
        routes[i].exact = false

        // 父视图也要放到default里
        this.views['default'].unshift(generateRoute(routes[i], this))

        if (routes[i].wrapper) {
          this.transitions[routes[i].name] = routes[i].wrapper
        }

        if (!routes[i].name) throw new Error('Routes with `children` must provide the `name` attribute')

        this.views[routes[i].name] = []

        for (let j = 0; j < routes[i].children.length; j++) {
          const child = routes[i].children[j]
          child.exact = true

          // 连接父级 path
          if (typeof child.path !== 'undefined') {
            child.path = '/' + resolve(routes[i].path, child.path)
          }

          const route = generateRoute(child, this)

          this.views[routes[i].name].push(route)
        }
      } else {
        routes[i].exact = true
        const route = generateRoute(routes[i], this)
        this.views['default'].push(route)
      }
    }
  }

  /**
  * 路由出口
  * e.g: <router.link to="/">Link</router.link>
  * @props {string|object} to 同Link
  **/
  get link () {
    const RouterLink = (props) => {
      return <Link to={typeof props.to === 'object' ? this.route(props.to) : props.to}>{props.children}</Link>
    }
    return RouterLink
  }

  /**
  * 路由出口
  * e.g: <router.view />
  * @props {string} name 子路由名称，默认default，根路由
  **/
  get view () {
    const RouterView = (props) => {
      const that = this
      const name = props.name || 'default'

      if (!this.views[name]) throw new Error('The view name `' + name + '` is not defined.')

      const wrapper = this.transitions[name]

      // 切换过渡包裹组件
      function Fade (props) {
        return <Route render={({ location }) => {
          // location for react-transition-group
          return typeof wrapper === 'function' ? wrapper(props.children, location) : props.children
        }} />
      }

      if (name === 'default') {
        if (this.mode === 'hash') {
          return (
            <HashRouter>
              <Fade><Switch key="switch1">{that.views[name]}</Switch></Fade>
            </HashRouter>
          )
        } else {
          return (
            <BrowserRouter>
              <Fade><Switch key="switch2">{that.views[name]}</Switch></Fade>
            </BrowserRouter>
          )
        }
      }

      return <Fade><Switch key="switch3">{that.views[name]}</Switch></Fade>
    }
  
    return RouterView
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
