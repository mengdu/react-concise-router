import React from 'react'
import Navbar from '../components/navbar'

export default class Home extends React.Component {
  componentWillMount () {
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <Navbar />
        <p>Home Page</p>
      </div>
    )
  }
}
