import React, { Component } from 'react'
import axios from 'axios';
import HeaderHOC from '../../components/header/header';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')


export default class Home extends Component {

  constructor(props) {
    let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
    super(props);
    this.state = ({
      token: localStorage.getItem('SessionToken'),
      imageUrl :infoUser.imageUrl,
      room : infoUser.room,
      name : infoUser.name
    })
  }

  componentWillMount(){
    if(!localStorage.getItem('SessionToken')){
      this.props.history.push('/')
    }
  }

  //TODO lvl 3
  check = () =>{
    console.log("OK", jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret))

    //Falla llamada al pedir verificación
    axios.get("http://localhost:9000/api/users/checkUser", {data: "AAAAAAAAAAAAAAAAA"}).then((response) => {
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
        <HeaderHOC infoUser={this.state}/>
        <button onClick={this.check}>CheckUserTEST</button>
        <button onClick={this.logout}>logout</button>
      </div>
    )
  }
}