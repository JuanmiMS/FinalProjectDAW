import React, { Component } from 'react'
import axios from 'axios';
import MenuHOC from '../../components/menu/menu';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')


export default class Home extends Component {

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
      this.props.history.push('/')
    }
  }

  //TODO lvl 3
  check = () => {
    console.log("OK", jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret))

    //Falla llamada al pedir verificación
    axios.get("http://localhost:9000/api/users/checkUser", { data: "AAAAAAAAAAAAAAAAA" }).then((response) => {
      console.log('response :', response.data);
    })

  }

  logout = () => {
    localStorage.removeItem('SessionToken')
    localStorage.removeItem('roomId')
    this.props.history.push('/login')
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
            <h1>FEEDBACK APPRECIATED! :)</h1>
            <h3>P.S.: For side navbar with dropdown menu, you may refer this snippet: http://bootsnipp.com/user/snippets/kWPoW</h3>
          </div>
        </div>
      </div>
      </div>
    )
  }
}