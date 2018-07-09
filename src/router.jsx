import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch, Link} from 'react-router-dom'
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

/**
* 编译字符串 :var
* @param {string} tpl
* @return {function} 返回函数
**/
function compileString (tpl) {
  let expression = tpl.replace(/(\'|\")/g, '\\$1')
    .replace(/\:(\w+)/g, function (txt, key) {
      console.log(txt, key)
      return '\' + data[\'' + key + '\'] + \''
    })
  return new Function('data', 'return \'' + expression + '\'')
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
  // 生成push函数参数
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
    return {}
  }
}
