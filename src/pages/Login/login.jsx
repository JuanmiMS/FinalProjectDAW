import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

import GoogleLogin from 'react-google-login';

class Login extends Component {

  constructor(props) {
    super(props);
       this.state = {
       loginError: false,
       redirect: false
    }
  }

  render() {

    if (this.state.redirect) {
      // return (<Redirect to={'/home'}/>)
    }

    const responseGoogle = (response) => {
      console.log(response);
      // axios.post("http://localhost:9000/api/putData", {
      //   message: "Hola que tal"
      // });
      this.setState({...this.state, redirect: true})
    }

    return (
      <div className="App">
        <h1>LOGIN WITH  GOOGLE</h1>
          <GoogleLogin
            clientId="873955508498-k84pufrfv8gj39eqmkcvko9gud36gkql.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
      </div>
    );
  }
}

export default Login;