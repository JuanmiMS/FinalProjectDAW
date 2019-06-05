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
        if (this.state.name !== infoUser.name) {
          this.setState({
            name: infoUser.name,
            googleId: infoUser.googleId,
            room: infoUser.room
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
      limitDate: this.state.date,
      room: this.state.room
    }

    axios.post("http://localhost:9000/api/works/add", { work })
      .then((response) => {
        this.props.history.push('/seeWork')

      }).catch((err) => {
        alert("error al agregar la tarea")
      })
  }


  dateSelected = date => {
    console.log('date :', date.getTime());

    this.setState({ date })
  }

  render() {
    return (
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <MenuHOC onLogout={this.logoutFather} />
            </nav>
            <div className="main-panel" style={{ overflow: 'auto' }}>
              <div className="content-wrapper">
                <div className="page-header">
                </div>
                <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body add-style">
                        <h4 className="card-title">Agregar tarea</h4>
                        <p className="card-description">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="inputBox">
                                Fecha límite: <DatePicker onChange={this.dateSelected} value={this.state.date} />
                              </div>
                            </div>
                          </div>
                        </p>

                        <div className="form-group">
                          <label htmlFor="exampleInputUsername1">Titulo</label>
                          <input type="text" className="form-control" id="title" placeholder="Titulo" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleTextarea1">Enunciado</label>
                          <textarea className="form-control" id="description" rows="35"></textarea>
                        </div>

                        <button onClick={this.addWork} className="btn btn-gradient-primary mr-2">Submit</button>
                      </div>
                    </div>
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
