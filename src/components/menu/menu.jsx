import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './menu.css'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class Menu extends Component {

  constructor(props) {
    super(props)
    if (localStorage.getItem('SessionToken') === null) {
      this.state = ({
        token: "nulo",
        imageUrl: "infoUser",
        room: "infoUser.roo",
        name: "infoUser.nam",
        rol: "infoUser.rol",
        redirect: false
      })
    }
    else {
      let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
      this.state = ({
        token: localStorage.getItem('SessionToken'),
        imageUrl: infoUser.imageUrl,
        room: infoUser.room,
        name: infoUser.name,
        rol: infoUser.rol,
        redirect: false
      })
    }
  }


  //TODO lvl 3
  check = () => {
    console.log("OK", jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret))


    //Falla llamada al pedir verificación
    axios.get("http://localhost:9000/api/users/checkUser", { data: "AAAAAAAAAAAAAAAAA" }).then((response) => {
      console.log('response :', response.data);
    })
  }
  addBots = () => {
    axios.post("http://localhost:9000/api/users/addRandoms").then((response) => {
      console.log('response :', response.data);
    })
  }



  logout = () => {
    localStorage.removeItem('SessionToken')
    localStorage.removeItem('roomId')
    this.props.onLogout()
  }

  render() {
    return (
      <div>
            <ul className="nav">
              <li className="nav-item nav-profile">
                <a href="#" className="nav-link">
                  <div className="nav-profile-image">
                    <img src={this.state.imageUrl} alt="profile" />
                    <span className="login-status online"></span>
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">{this.state.name}</span>
                    <span className="text-secondary text-small">{this.state.rol}</span>
                  </div>
                </a>
                  <button onClick={this.logout} className="btn btn-sm btn-danger">logout</button>
              </li>
              <li className="nav-item sidebar-actions">
                <span className="nav-link">
                  <div className="border-bottom">
                    <h6 className="font-weight-normal mb-3">Sala: {this.state.room}</h6>
                  </div>
                </span>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" href="index.html">
                  <span className="menu-title">Home</span>
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/seeWork" className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-title">Ver tareas</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/seeUsers" className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-title">Alumnos</span>
                </Link>
              </li>

              <li className="nav-item sidebar-actions">
                  <Link to="/addWork">
                    <button className="btn btn-block btn-lg btn-gradient-primary mt-4">Agregar tarea</button>
                  </Link>
              </li>
            </ul>
      </div>


      /* <div className="logo">
          <img src={this.state.imageUrl} className="img-responsive center-block" alt="Logo" />
      </div>
      <div className="left-navigation">
          <ul className="list">
              <h5><strong>{this.state.rol} {this.state.name}</strong></h5>
              <h5><strong>SALA: {this.state.room}</strong></h5>
              <Link to="/"><li> Inicio</li></Link>
              <Link to="/seeWork"><li> Ver tareas</li></Link>
              
              ---PROFESOR LINKS---
              <Link to="/addWork"><li> Añadir tarea</li></Link>
              <Link to="/seeUsers"><li> Alumnos </li></Link>
          </ul>
      </div>
      <button onClick={this.addBots}>addBots</button>
      <button onClick={this.logout}>logout</button>
  </div> */
    )
  }
}
