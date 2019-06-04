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
    axios.post("http://juanmi.ovh:9000/api/users/userInfo", { data })
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

    const data = [
      { name: 'Terminadas', value: this.state.user.taskFinished, fill: "#24D0B7" },
      { name: 'Sin Terminar', value: 12 - this.state.user.taskFinished, fill: "#ef6464" }
    ];

    return (

<div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <MenuHOC onLogout={this.logoutFather} />
            </nav>
            <div className="main-panel">

              <div className="row">
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body">
                      <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tareas completadas
                    <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.user.taskFinished}</h2>
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
                      <h2 className="mb-5 center-text">{this.state.user.totalTasks - this.state.user.taskFinished}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tokens totales
                    <i className="mdi mdi-diamond mdi-24px float-right center-text"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.user.totalTokens}</h2>
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
                        <Bar dataKey="Mal" fill="#ef6464" />
                        <Bar dataKey="Regular" fill="#FFBE96" />
                        <Bar dataKey="Bien" fill="#2892E6" />
                        <Bar dataKey="Muy bien" fill="#24D0B7" />
                      </BarChart>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-5 grid-margin stretch-card">
                  <div className="card bar-chart-cell-pie">
                    <div className="card-body">
                      <h4 className="card-title">Gráfica tareas completas/incompletas</h4>
                      <div className="pie-chart-css">
                      <PieChart width={300} height={300}>
                    <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} label />
                    <Legend />
                    <Tooltip />
                  </PieChart>
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