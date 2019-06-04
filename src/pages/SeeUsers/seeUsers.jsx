import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Bar, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart
} from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './seeUsers.css'
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
          console.log('this.state', this.state)
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
          console.log('this.state', this.state)
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
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body">
                      <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tareas completadas
                    <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.user&& this.state.user.taskFinished}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body">
                      <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tareas sin completar
                    <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.user&& this.state.user.totalTasks - this.state.user.taskFinished}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Alumnos con vida
                    <i className="mdi mdi-diamond mdi-24px float-right center-text"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.user&& this.state.users.length}</h2>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-5 grid-margin stretch-card">
                  <div className="card bar-chart-cell">
                    <div className="card-body">
                      <div className="clearfix">
                        <h4 className="card-title float-left">Estado de las tareas</h4>
                        <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right">
                        
                        </div>
                        <BarChart
                        width={500}
                        height={300}
                        data={this.getStateData(this.state.user&& this.state.user.actualStates)}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="1 4" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Mal" fill="#ef6464" />
                        <Bar dataKey="Regular" fill="#FFBE96" />
                        <Bar dataKey="Bien" fill="#2892E6" />
                        <Bar dataKey="Muy bien" fill="#24D0B7" />
                      </BarChart>
                      </div>
                      
                    </div>
                  </div>
                </div>
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
              {/* <div className="col-sm-4">
                    <div className="thumbnail card">
                      <div className="caption card-body">
                        <h4 className="group card-title inner list-group-item-heading">
                          Tareas completas (Dividir resultado entre 12)</h4>
                        <p className="group inner list-group-item-text">
                          {this.state.user &&
                            this.state.user.taskFinished}/
                            {
                              this.state.user &&
                              this.state.user.totalTasks
                              }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="thumbnail card">
                      <div className="caption card-body">
                        <h4 className="group card-title inner list-group-item-heading">
                          Tokens totales</h4>
                        <p className="group inner list-group-item-text">
                          {this.state.user &&
                            this.state.user.totalTokens}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="thumbnail card">
                      <div className="caption card-body">
                        <h4 className="group card-title inner list-group-item-heading">
                          Alumnos con vida</h4>
                        <p className="group inner list-group-item-text">
                          {this.state.users.length}
      </p>
                      </div>
                    </div>
                  </div>

                  <BarChart
                    width={500}
                    height={300}
                    data={this.getStateData(
                      this.state.user &&
                      this.state.user.actualStates)}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="1 4" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Mal" fill="#DC143C" />
                    <Bar dataKey="Regular" fill="#F0E68C" />
                    <Bar dataKey="Bien" fill="#00BFFF" />
                    <Bar dataKey="Muy bien" fill="#228B22" />
                  </BarChart>

                </div>
              </div>


                  <tbody>
                    {this.state.users.map((user, index) => (
                      <tr>
                        <th scope="row"><img src={user.imageUrl} style={{ width: ""50px" }} /></th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/seeUser/${user.googleId}`} key={`carta` + index}>{user.googleId}</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}


            </div>
          </div>
        </div>
      </div>
    )
  }
}