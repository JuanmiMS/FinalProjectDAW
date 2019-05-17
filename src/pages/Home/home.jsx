import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import HeaderHOC from '../../components/header';
const jwt = require('jsonwebtoken')
const config = require('config')


export default class Home extends Component {

  constructor(props) {
   //TODO lvl 1
    let infoUser = jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident")
    super(props);
    this.state = {
      token: localStorage.getItem('SessionToken'),
      imageUrl :infoUser.imageUrl,
      room : infoUser.room,
      name : infoUser.name
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('SessionToken')){
      this.props.history.push('/')
    }
    console.log('this.state :', this.state);
  }

  //TODO lvl 3
  check = () =>{
    console.log("OK", jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident"))

    axios.get("http://localhost:9000/api/users/checkUser", {data: "AAAAAAAAAAAAAAAAA"}).then((response) => {
        console.log('response :', response.data);
    })
    
  }

  logout = () => {
    localStorage.removeItem('SessionToken')
    localStorage.removeItem('roomId')
    this.props.history.push('/')
  }


  render() {

    return (
      <div>
        <HeaderHOC infoUser={this.state}/>
        {/* <button onClick={this.check}>CheckUserTEST</button> */}
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={this.logout}
          onFailure={this.logout}
          
        >
        </GoogleLogout>
      </div>
    )
  }
}