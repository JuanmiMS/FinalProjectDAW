import React, { Component } from 'react'



import GoogleLogin from 'react-google-login';

class Login extends Component {

  render() {

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
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