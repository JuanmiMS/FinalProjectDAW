import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { connect } from 'react-redux'
import './login.css'
import addToken from '../../redux/actions/addToken'
// import config from '../../config/default.json'

const config = require('config')

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
          token: response.data.token,
          room: 'prueba'
        })
        localStorage.setItem('SessionToken', response.data.token);
        localStorage.setItem('roomId', "prueba");
        this.props.history.push('/home')
      })
      .catch(error => {
        this.invalidEmail("error")
      });
  }

  invalidEmail = msg => {
    alert(msg)
  }

  componentDidMount(){
    if (localStorage.getItem('SessionToken') && localStorage.getItem('roomId'))  {
      this.props.history.push('/home')
    }
  }

  render() {
    let isLogged;
    let logo = config.logo

    if (localStorage.getItem('SessionToken') && localStorage.getItem('SessionToken')) {
      isLogged = 
      <div>
        Introduzca el código del aula
        <input type="text" className="form-control" id="codeInput" placeholder="Enter code" />
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