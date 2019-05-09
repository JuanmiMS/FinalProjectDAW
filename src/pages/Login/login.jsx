import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
// const config = require('config')


class Login extends Component {
  
  constructor(props) {
    super(props);
       this.state = {
      token : ''
    }
  }

  responseGoogle = (response) => {
    console.log(response);
    axios.post("http://localhost:9000/api/users/", response)
    .then((response) => {
      console.log(response)     
      this.setState({
        token: response.data.token
      })
      console.log('this.state', this.state)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    console.log('this.props :', this.props.currentItem);
    console.log('this.props :', this.props.hola);

    return (
      <div className="App">
        <h1>LOGIN WITH  GOOGLE patata</h1>
          <GoogleLogin
            clientId="873955508498-k84pufrfv8gj39eqmkcvko9gud36gkql.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <br></br>
          Token: {this.state.token}<br></br>
          {this.props.currentItem.title}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem : state.currentItem,
    hola: 1243,
  }
}

export default connect(mapStateToProps)(Login)