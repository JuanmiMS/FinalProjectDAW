import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { connect } from 'react-redux'
import './login.css'
import addToken from '../../redux/actions/addToken'
import { Redirect } from 'react-router-dom'

// const config = require('config')

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      redirect: false
    }

  }
  responseGoogle = (response) => {
    axios.post("http://localhost:9000/api/users/", response)
      .then((response) => {
        this.setState({
          token: response.data.token
        })
        localStorage.setItem('SessionToken', response.data.token);
      })
      .catch(error => {
        this.invalidEmail(error.response.data.msg)
      });
  }

  invalidEmail = msg => {
    alert(msg)
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.token) {
      return <Redirect to='/home' />
    }
  }

  render() {

    let isLogged;
    let logo = "http://www.iesfbmoll.org/wp-content/uploads/2013/11/Imagen2.png"

    if (this.state.token) {
      isLogged = 
      <div>
        Introduzca el código del aula
        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter code" />
      </div>
    }
    else {
      isLogged =
        <GoogleLogin
          clientId="873955508498-k84pufrfv8gj39eqmkcvko9gud36gkql.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={this.responseGoogle}
          onFailure={() => alert("Ocurrió algo mal al intentar hacer login")}
        />
    }

    return (
      <div className="container h-100">
      {this.renderRedirect()}
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={logo} className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <div className="App">
                {isLogged}
                {/* Token: {this.state.token}<br></br>
                  {this.props.currentItem.title} */}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

//Devuelve estados
const mapStateToProps = (state) => {
  return {
    currentItem: state.currentItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToken,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)