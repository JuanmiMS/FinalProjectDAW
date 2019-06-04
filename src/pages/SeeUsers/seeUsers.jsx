import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart
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
    axios.post("http://localhost:9000/api/users/allUsers", { data })
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

    axios.post("http://localhost:9000/api/users/allUserInfo", { data })
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

    console.log('data :', data);
  }


  render() {

    return (
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <MenuHOC onLogout={this.logoutFather} />
            </nav>
            <div className="main-panel">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body  table-style">
                      <h4 className="card-title">Striped Table</h4>
                      <table className="table table-striped .table-bordered">
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