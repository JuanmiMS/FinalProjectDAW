import React, { Component } from 'react'


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('SessionToken')
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('SessionToken') || !localStorage.getItem('roomId')){
      console.log('se :');
      this.props.history.push('/')
    }
  }

  logout = () => {
    localStorage.removeItem('SessionToken')
    localStorage.removeItem('roomId')
    this.props.history.push('/')
  }

  render() {

    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}