import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Bar, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart
} from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './seeUsers.css'
import Card from '../../components/card/card';
import BarChartHOC from '../../components/graphs/bar';
const config = require('config')
const jwt = require('jsonwebtoken')

export default class SeeUsers extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      redirect: false,
      users: []
    })
  }

  componentWillMount() {
    this.logout()
    //TODO lvl 2 cambiar por variable de entorno el secreto
    let infoUser = jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident")
    let data = { room: infoUser.room }
    axios.post("http://juanmi.ovh:9000/api/users/allUsers", { data })
      .then((response) => {

        this.setState({
          userId: infoUser.googleId,
          users: response.data
        }, () => {
          console.log('this.stateUSERS', this.state)
        })

      }).catch((error) => {
        console.log('error :', error);
      })

    axios.post("http://juanmi.ovh:9000/api/users/allUserInfo", { data })
      .then((response) => {

        this.setState({
          userId: infoUser.googleId,
          user: response.data
        }, () => {
          console.log('this.state2', this.state)
        })

      }).catch((error) => {
        console.log('error :', error);
      })
  }


  componentDidUpdate() {
    this.logout()
  }

  logout = _ => {
    if (!localStorage.getItem('SessionToken') || this.state.redirect) {
      this.props.history.push('/login')
    }
    else {
      let infoUser = jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident")

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


  getIncompleteTask = () => {
    console.log("this.state.user", this.state.user)
    console.log("this.state.totalTasks", this.state.user && this.state.totalTasks)
    console.log("this.state.user.taskFinished", this.state.user && this.state.user.taskFinished)
    console.log("this.state.totalTasks - this.state.user.taskFinished", this.state.user && this.state.totalTasks - this.state.user && this.state.user.taskFinished)
    return 8
  }

  getStateData = info => {
    console.log('info :', info);
    let data = []
    if (info !== undefined) {
      data = [
        {
          Mal: info[0]
        },
        {
          Regular: info[1]
        },
        {
          Bien: info[2]
        },
        {
          "Muy bien": info[3]
        }
      ]

      return data
    }
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

              <div className="row">
                <Card title={'Tareas completadas'} type={'success'} info={this.state.user && this.state.user.taskFinished} />
                <Card title={'Tareas sin completar'} type={'danger'} info={this.state.user && this.state.user.unfinishedTasks} />
                <Card title={'Tokens totales'} type={'info'} info={this.state.user && this.state.user.totalTokens} />
              </div>


              <div className="row">
                <BarChartHOC states={this.state.user&& this.state.user.actualStates} />
              </div>

            

            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card" >
                  <div className="card-body table-style" >
                    <h4 className="card-title">Alumnos</h4>
                    <table className="table table-striped .table-bordered" >
                      <thead>
                        <tr>
                          <th>Usuario</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Progreso</th>
                          <th>Tokens Totales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((user, index) => (
                          <tr key={`user` + index}>
                            <td className="py-1">
                              <img src={user.imageUrl} alt="image" />
                            </td>
                            <td>
                              <Link to={`/seeUser/${user.googleId}`} >{user.name}</Link>
                            </td>
                            <td>
                              <a href={`mailto:${user.email}`} target="_blank">{user.email}</a>
                            </td>
                            <td>
                              <div className="progress">
                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: "90%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td>
                              15
                              </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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