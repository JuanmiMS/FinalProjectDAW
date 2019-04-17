import React from 'react'
import {Link} from 'react-router-dom'

class Bye extends React.Component {
  render() {
    return (
      <div>
        <h1>BYE</h1>
        <Link to='/'>
          IR A HOME
        </Link>
      </div>)
  }
}
export default Bye