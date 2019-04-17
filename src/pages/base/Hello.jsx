import React from 'react'
import {Link} from 'react-router-dom'

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Link to='/'>
          IR A HOME
        </Link>
      </div>)
  }
}
export default Hello