import React from 'react'
import nprogress from 'nprogress'
/**
* 用于包裹页面，实现切换事件
**/
export default class RouterWrapper extends React.Component {
  componentWillMount () {
    // console.log('will')
    nprogress.start()
  }
  componentDidMount () {
    // console.log('did')
    nprogress.done()
  }
  render () {
    // 这里要传递Route组件的props
    return <this.props.children {...this.props} />
  }
}
