import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')


export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      redirect: false
    })
  }

  componentWillMount() {
    this.logout()
  }

  componentDidUpdate(){
    this.logout()
  }

  logout = _ => {
    if (!localStorage.getItem('SessionToken') || this.state.redirect) {
      this.props.history.push('/login')
    }
  }

  logoutFather = _ => {
    this.setState({ redirect: true }, () => {
      console.log('LOGOUT!');
    })
  }

render() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 col-sm-4 sidebar1">
            <MenuHOC onLogout={this.logoutFather}/>
          </div>
          <div className="col-md-10 col-sm-8 main-content">
            <h1>HOME</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
}