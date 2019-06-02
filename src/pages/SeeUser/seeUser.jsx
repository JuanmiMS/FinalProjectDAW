import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
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
      user: []
    })
  }

  componentWillMount() {
    this.logout()

    let infoUser = jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident")
    let data = { googleId: this.props.match.params.userId }
    axios.post("http://localhost:9000/api/users/userInfo", { data })
      .then((response) => {
        console.log('response', response.data)
        this.setState({
          userId: infoUser.googleId,
          user: response.data,
          name: response.name,
          imageUrl: response.imageUrl
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
            image: infoUser.imageUrl,
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

    const data01 = [
      { name: 'Terminadas', value: this.state.user.taskFinished, fill: "#228B22" },
      { name: 'Sin Terminar', value: 12 - this.state.user.taskFinished, fill: "#DC143C" }
    ];

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-4 sidebar1">
              <MenuHOC onLogout={this.logoutFather} />
            </div>
            
            <div className="col-md-10 col-sm-8 main-content">
            <img src={this.state.user.imageUrl} style={{ width: 100 }} />
                {this.state.user.userName}
              <div className="container" style={{ marginTop: 50 }}>
                
                <div className="row">

                  <div className="col-sm-4">
                    <div className="thumbnail card">
                      <div className="caption card-body">
                        <h4 className="group card-title inner list-group-item-heading">
                          Tareas completas</h4>
                        <p className="group inner list-group-item-text">
                          {this.state.user.taskFinished}/{this.state.user.totalTasks}

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
                          {this.state.user.totalTokens}</p>
                      </div>
                    </div>
                  </div>
                  <PieChart width={400} height={400}>
                    <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} label />
                    <Tooltip />
                  </PieChart>
                  <BarChart
                    width={500}
                    height={300}
                    data={this.getStateData(this.state.user.actualStates)}
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}