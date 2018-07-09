import React from 'react'
/**
* 用于包裹页面，实现切换事件
**/
export default class RouterWrapper extends React.Component {
  componentWillMount () {
    this.props.start && this.props.start()
  }
  componentDidMount () {
    // console.log('did')
    this.props.done && this.props.done()
  }
  render () {
    // 这里要传递Route组件的props
    return <this.props.children {...this.props} />
  }
}
