import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('SessionToken')
    }
  }

  componentWillMount(){
    console.log(localStorage.getItem('SessionToken'))
  }

  logout = () => {
    this.setState({token : ''})
  }

  render() {

    if (!this.state.token) {
      return (<Redirect to={'/'}/>)
    }

    const logout = (response) => {
      this.setState({ ...this.state, login: false })
    }

    return (
      <div>
        <h1>Home</h1>

<button onClick={this.logout}>Logout</button>
        {/* <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout> */}
      </div>
    )
  }
}