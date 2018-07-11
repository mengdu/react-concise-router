import React from 'react'
/**
* 用于包裹页面，实现切换事件
**/
export default class RouterWrapper extends React.Component {
  state = {
    waiting: true
  }
  done () {
    return (to) => {
      if (to) {
        const path = typeof to === 'string' ? to : this.props.router.route(to)
        this.props.history.push(path)
      } else {
        this.setState({
          waiting: false
        })
      }
    }
  }
  componentWillMount () {
    if (this.props.router.beforeEach) {
      if (typeof this.props.router.beforeEach !== 'function') {
        throw new Error('The `router.beforeEach` must be a function.')
      }
      this.props.router.beforeEach(this.props, this.done())
    } else {
      this.setState({
        waiting: false
      })
    }
  }
  render () {
    if (this.state.waiting) return null
    // 这里要传递Route组件的props
    return <this.props.children {...this.props} />
  }
}
