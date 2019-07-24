import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import RouterWrapper from './router-wrapper'
import RouterView from './router-view'
import { resolve, compileString, objectToQueryString } from './utils'

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

    // 包裹组件映射
    this.wrappers = {
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
          this.wrappers[routes[i].name] = routes[i].wrapper
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
      if (props.type === 'NavLink') {
        return <NavLink { ...props } to={typeof props.to === 'object' ? this.route(props.to) : props.to}>{props.children}</NavLink>
      }
      return <Link { ...props } to={typeof props.to === 'object' ? this.route(props.to) : props.to}>{props.children}</Link>
    }
    return RouterLink
  }

  /**
  * 路由出口
  * e.g: {router.view(name)}
  * @props {string} name 子路由名称，默认default，根路由
  **/
  view (name) {
    return <RouterView name={name} router={this} />
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
  route ({ params = {}, query = {}, hash, path, name }) {
    if (name) {
      const route = this.routes.filter(e => e.name === name)[0]

      if (!route) throw new Error('The name \'' + name + '\' is cannot found in routes')

      path = route.path
    }
  
    path = compileString(path)(params)

    const queryString = query ? (objectToQueryString(query)) : ''

    hash = hash ? ('#' + hash) : ''

    return `${path}${queryString ? '?' + queryString : ''}${hash}`
  }
}
