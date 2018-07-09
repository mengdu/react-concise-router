import React from 'react'

function Test (props) {
  console.log('test', props)
  return <div>test</div>
}

export default class Dashboard extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        Dashboard
        <Test />
      </div>
    )
  }
}
