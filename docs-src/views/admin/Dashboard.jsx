import React from 'react'

export default class Dashboard extends React.Component {
  componentWillMount () {
    console.log('Dashboard', this)
  }

  render () {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}
