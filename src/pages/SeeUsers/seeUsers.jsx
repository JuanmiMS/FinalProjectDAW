import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart
} from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios'
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

    console.log('data :', data);
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
              <div className="container" style={{ marginTop: 50 }}>





                <div className="row">

                  <div className="col-sm-4">
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



              <div className="row">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Nombre</th>
                      <th scope="col">email</th>
                      <th scope="col">Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => (
                      <tr>
                        <th scope="row"><img src={user.imageUrl} style={{ width: "50px" }} /></th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/seeUser/${user.googleId}`} key={`carta` + index}>{user.googleId}</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        </div>
      </div>
    )
  }
}