import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
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
      </div>
    )
  }
}