import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { connect } from 'react-redux'
import './login.css'
import addToken from '../../redux/actions/addToken'
const config = require('../../config/default')


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
        })
        localStorage.setItem('SessionToken', response.data.token);
        if(response.data.user.room !== ''){
          this.props.history.push('/')
        }
        else{
          this.props.history.push('/addRoom')
        }
        
      })
      .catch(error => {
        this.invalidEmail("error mail")
      });
  }

  invalidEmail = msg => {
    alert(msg)
  }

  componentDidMount(){
    if (localStorage.getItem('SessionToken') && localStorage.getItem('roomId'))  {
      this.props.history.push('/')
    }
  }

  logout = () => {
    localStorage.removeItem('SessionToken')
    this.props.history.push('/login')
  }

  addRoom =  () => {
    let sala = "testRoom"
    axios.post("http://localhost:9000/api/users/addRoom", {sala: sala, token: localStorage.getItem('SessionToken')})
      .then((response) => {
        console.log('response', response)        
      })
      .catch(error => {
        alert("Sala incorrecta")
      });
  }

  render() {
    let isLogged;
    let logo = config.logo

    if (localStorage.getItem('SessionToken')) {
      isLogged = 
      <div>
        Introduzca el código del aula
        <input type="text" className="form-control" id="codeInput" placeholder="Enter code" />
        <button onClick={this.logout} className="btn btn-danger" style={{margin: "5px"}}>Cambiar Cuenta</button>
        <button onClick={this.addRoom} className="btn btn-info" style={{float: "right", margin: "5px"}}>Agregar aula</button>
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
            <div className="d-flex justify-content-center form_container ">
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