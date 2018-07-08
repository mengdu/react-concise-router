import React from 'react'

export default class MButton extends React.Component {
  state = {
    clicked: false
  }
  handleClick (e) {
    this.props.click && this.props.click(e)
    this.setState({clicked: true})
    setTimeout(() => {
      this.setState({clicked: false})
    }, 500)
    if (this.props.href) {
      window.location.href = this.props.href
    }
  }
  render () {
    let {type, size, plain, round, block, active} = this.props
    let bcls = [
      'm-button',
      type ? `m-button-${type}` : '',
      size ? `m-button-${size}` : '',
      plain && 'm-button-type-plain',
      round && 'm-button-rounded',
      block && 'm-button-block',
      active && 'active',
      (this.state.clicked && !active) && 'clicked'
    ].filter(e => e).join(' ')
    return (
      <button
        onClick={(e) => this.handleClick(e)}
        disabled={this.props.disabled}
        className={bcls}
        >
        <span>{this.props.children}</span>
      </button>
    )
  }
}
