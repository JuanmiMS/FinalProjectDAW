import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')


export default class addWork extends Component {
    constructor(props) {
        let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
        super(props);
        this.state = ({
          token: localStorage.getItem('SessionToken'),
          imageUrl: infoUser.imageUrl,
          room: infoUser.room,
          name: infoUser.name
        })
      }
    
      componentWillMount() {
        if (!localStorage.getItem('SessionToken')) {
          this.props.history.push('/login')
        }
      }
  render() {
    return (
        <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-4 sidebar1">
              <MenuHOC infoUser={this.state} />
              <button onClick={this.check}>CheckUserTEST</button>
              <button onClick={this.logout}>logout</button>
            </div>
          
          <div className="col-md-10 col-sm-8 main-content">
            {/* <!--Main content code to be written here -->  */}
            <h1>add work</h1>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
