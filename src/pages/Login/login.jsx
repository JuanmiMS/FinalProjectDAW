import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import {connect} from 'react-redux'
// const config = require('config')
import { Redirect } from 'react-router-dom'

import addToken from '../../redux/actions/addToken'


class Login extends Component {
  
  constructor(props) {
    super(props);
       this.state = {
      token : ''
    }
  }

  responseGoogle = (response) => {
    axios.post("http://localhost:9000/api/users/", response)
    .then((response) => {
      console.log("dasd", response)     
      this.setState({
        token: response.data.token
      })
      console.log('this.state', this.state)
      // this.props.addToken(response.data.token)
    })
    .catch(function (error) {
      alert(error.response.data.msg)
    });
  }

  componentDidMount(){
    this.props.addToken(this.state.token)
  }

  render() {

    console.log('this.props :', this.props.currentItem);
    console.log('this.props :', this.props);

    return (
      <div className="App">
        <h1>LOGIN WITH  GOOGLE</h1>
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

//Devuelve estados
const mapStateToProps = (state) => {
  return {
    currentItem : state.currentItem
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addToken,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)