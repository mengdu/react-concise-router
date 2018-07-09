import Router from '~/src'
import Home from './views/Home'
import User from './views/User'
import UserInfo from './views/UserInfo'
import ErrorPage from './views/Error'
import view from './views/admin/view'
import Dashboard from './views/admin/Dashboard'

export default new Router ({
  mode: 'hash',
  routes: [
    {path: '/', component: Home},
    {path: '/user', component: User},
    {path: '/user/:userId', component: UserInfo},
    {
      path: '/admin',
      component: view,
      name: 'admin-view',

      children: [
        {path: '/', component: Dashboard},
        {component: ErrorPage}
      ]
    },
    {path: '*', component: ErrorPage},
  ]
})
