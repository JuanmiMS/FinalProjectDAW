import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import './addWork.css'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')


export default class addWork extends Component {


  constructor(props) {
    super(props)
    this.state = ({
      redirect: false
    })
  }

  componentWillMount() {
    this.logout()

  }

  componentDidUpdate(){
    this.logout()
  }

  logout = _ => {
    if (!localStorage.getItem('SessionToken') || this.state.redirect) {
      this.props.history.push('/login')
    }
  }
  
  logoutFather = _ => {
    this.setState({ redirect: true }, () => {
      console.log('LOGOUT!');
    })
    
  }

  render() {

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-4 sidebar1">
              <MenuHOC onLogout={this.logoutFather}/>
            </div>
            <div className="col-md-10 col-sm-8 main-content">
              <div className="container-fluid">
                <div className="container">
                  <div className="formBox">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          <h1>Contact form</h1>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox ">
                            <div className="inputText">First Name</div>
                            <input type="text" name="" className="input" />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <div className="inputText">Last Name</div>
                            <input type="text" name="" className="input" />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox">
                            <div className="inputText">Email</div>
                            <input type="text" name="" className="input" />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <div className="inputText">Mobile</div>
                            <input type="text" name="" className="input" />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="inputBox">
                            <div className="inputText">Email</div>
                            <textarea className="input"></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <input type="submit" name="" className="button" value="Send Message" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
