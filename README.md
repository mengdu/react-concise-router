# react-concise-router

A concise router base on [react-router v4.x](https://github.com/ReactTraining/react-router).

```ls
npm install -S react-concise-router
```

**Required**

```ls
npm install -S react-router
```

```ls
npm install -S react-router-dom
```


## use

```js
import Router from 'react-concise-router'
```

## API

**new Router(options)** 创建路由对象，返回router。

+ **options** object 路由配置的对象
+ **options.mode** string 定义路由类型，hash|history
+ **options.routes** array 路由列表
+ **options.routes[].name** string 路由名称，如果当前存在children属性，表示路由出口名称
+ **options.routes[].path** string 路径
+ **options.routes[].component** Function 路由组件；如果当前存在children属性，表示子路由组件
+ **options.routes[].children** array 子路由列表

> `options.path` 不存在或者为 `*` 路由会当做notMath路由，匹配404

### router

+ **router.route(route)** 生成url，用于history.push。

+ **router.beforeEach(cxt, next)** 路由切换中间件

#### router.view

`<router.view />` 是一个路由出口组件。

**props**

  + **props.name** string 路由出口子名称，默认'default'；在 `options.routes[].name` 设置。

#### router.link

`router.link` 是一个类似于 `Link` 的组件。

**props**

+ **props.to** object|string 路径或者路径对象route。


#### router.beforeEach

`router.beforeEach` 是一个路由中间件，你可以做一些路由切换事件；比如授权拦截，重定向，等待等操作。

你应该把它定义为一个函数

```js
router.beforeEach = function (ctx, next) {}
```

+ **ctx** 这个是一个上下文对象，{route, router, history,...}
+ **next** 这是一个回调函数，请在最后调用它；`next` 可以接受一个字符串路径或者对象，这样可以重定向到别的路由。

### route

+ **route.name** string 命名路由name，优先于path
+ **route.path** string 路径
+ **route.params** object 路由参数对象
+ **route.query** object 查询字符串对象
+ **route.hash** string 链接hash

## example

**router.js**

```js
import Router from '~/src'
import Home from './views/Home'
import User from './views/User'
import UserInfo from './views/UserInfo'
import ErrorPage from './views/Error'
import view from './views/admin/view'
import Dashboard from './views/admin/Dashboard'

const router = new Router ({
  mode: 'hash',
  routes: [
    {path: '/', component: Home},
    {path: '/user', component: User},
    {path: '/user/:userId', name: 'info', component: UserInfo},
    {
      path: '/admin',
      component: view,
      name: 'admin-view',

      children: [
        {path: '/', component: Dashboard},
        {path: '/test', component: Dashboard},
        {component: ErrorPage}
      ]
    },
    {path: '*', component: ErrorPage},
  ]
})

router.beforeEach = function (ctx, next) {
  console.log('start', ctx)
  if (ctx.route.name === 'info') {
    next('/')
  } else {
    setTimeout(() => {
      next()
    }, 100)
  }
}

export default router
```

**App.jsx**

```jsx
import React from 'react'
import router from './router'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <p>wellcome !</p>
        <router.view />
      </div>
    )
  }
}

```
