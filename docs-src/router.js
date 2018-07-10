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
