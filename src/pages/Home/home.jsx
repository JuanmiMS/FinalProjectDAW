import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login';
import {Redirect} from 'react-router-dom';


export default class Home extends Component {
  
    constructor(props) {
        super(props);
           this.state = {
           login: true
        }
      }
  
    render() {
    if (!this.state.login) {
        return (<Redirect to={'/'}/>)
    }

    const logout = (response) => {
        console.log(response);
        this.setState({...this.state, login: false})
      }

    return (
      <div>
        <h1>Home</h1>
        <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>
      </div>
    )
  }
}