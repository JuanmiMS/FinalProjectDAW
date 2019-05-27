import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import './addWork.css'
import DatePicker from 'react-date-picker'
import axios from 'axios'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')



export default class addWork extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      redirect: false,
      date: new Date()
    })
  }

  componentWillMount() {
    this.logout()

  }

  componentDidUpdate() {
    this.logout()
  }


  logout = _ => {
    if (!localStorage.getItem('SessionToken') || this.state.redirect) {
      this.props.history.push('/login')
    }
    else {
      let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)

      if (infoUser.rol !== "Profesor") {
        this.props.history.push('/')
      }
      else {
        if(this.state.name !== infoUser.name){
        this.setState({
          name: infoUser.name,
          googleId: infoUser.googleId,
          room : infoUser.room
        })
      }
      }
    }
  }

  logoutFather = _ => {
    this.setState({ redirect: true }, () => {
      console.log('LOGOUT!');
    })

  }

  addWork = _ => {

    const work = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      authorName: this.state.name,
      authorGoogleId: this.state.googleId,
      limitDate : this.state.date,
      room : this.state.room
    }

    console.log('work', work)
    axios.post("http://localhost:9000/api/works/add", { work })
      .then((response) => {
        console.log("RESPUESTA:", response)
      }).catch((err)=>{
        console.log('err', err)
      })
  }


  dateSelected = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-4 sidebar1">
              <MenuHOC onLogout={this.logoutFather} />
            </div>
            <div className="col-md-10 col-sm-8 main-content">
              <div className="container-fluid">
                <div className="container">
                  <div className="formBox">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          <h1>Agregar nueva tarea</h1>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="inputBox ">
                            <input type="text" id="title" placeholder="Titulo" className="input" />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="inputBox">
                            <textarea placeholder="Enunciado" id="description" className="input"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="inputBox">
                              Fecha límite: <DatePicker onChange={this.dateSelected} value={this.state.date}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <input onClick={this.addWork} className="button" defaultValue="Agregar tarea" />
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
