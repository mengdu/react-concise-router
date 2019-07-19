import React from 'react'
import Loadable from 'react-loadable'
import Router from '~/src'
import Home from './views/Home'
import User from './views/User'
import About from './views/About'
import ErrorPage from './views/Error'
import UserInfo from './views/UserInfo'
import view from './components/admin-view'
import Dashboard from './views/admin/Dashboard'
import Page1 from './views/admin/page1'
import Page2 from './views/admin/page2'
import QueueAnim from 'rc-queue-anim'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Loading = () => <div>Loading...</div>

const Page3 = Loadable({
  loader: () => import('./views/admin/page3'),
  loading: Loading,
  delay: 5000
})

console.log(Page3)

const router = new Router ({
  // mode: 'hash',
  // wrapper: function (route, location) {
  //   // key for CSSTransition
  //   const key = location.pathname.indexOf('/admin') === 0 ? '/admin' : location.key
  //   // TransitionGroup 过渡会使路由执行两次，目前不知道原因
  //   // return <TransitionGroup><CSSTransition timeout={300}  classNames="fade-in" key={key}>{route}</CSSTransition></TransitionGroup>
  //   return <QueueAnim type={['right', 'left']}>{route}</QueueAnim>
  // },
  routes: [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/user/:userId', component: UserInfo },
    { path: '/about', component: About },
    { 
      path: '/admin',
      name: 'admin-view',
      component: view,
      wrapper: function (route, location) {
        return <QueueAnim type={['right', 'left']}>{route}</QueueAnim>
        // return <SwitchTransition><CSSTransition timeout={300}  classNames="fade-in" key={location.key}>{route}</CSSTransition></SwitchTransition>
      },
      children: [
        { path: '', component: Dashboard, meta: { title: 'Admin dashboard' } },
        { path: 'page1', component: Page1 },
        { path: '/page2', component: Page2 },
        { path: 'page3', component: Page3 },
        { path: '*', component: ErrorPage } // /admin/other 的 404页面
      ]
    },
    { name: '404', component: ErrorPage } // 全局的404
  ]
})

router.beforeEach = function (ctx, next) {
  console.log('start', ctx)
  NProgress.start()
  next()
  NProgress.inc(0.4)
  setTimeout(() => {
    NProgress.done()
  }, 200)
}

console.log(router)

export default router
