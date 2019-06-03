import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart
} from 'recharts';
import axios from 'axios'
// const config = require('config')
import './home.css'
const jwt = require('jsonwebtoken')

export default class Home extends Component {


  constructor(props) {
    super(props)
    this.state = ({
      redirect: false
    })
  }

  componentWillMount() {
    this.logout()

    //TODO lvl 2 cambiar por variable de entorno el secreto
    let infoUser = jwt.verify(localStorage.getItem('SessionToken'), "ReactForPresident")
    this.setState({
      googleId: infoUser.googleId
    }, () => {

      //Get tasks data
      let data = { googleId: this.state.googleId }
      axios.post("http://localhost:9000/api/users/userInfo", { data })
        .then((response) => {

          const { taskFinished, totalTasks, totalTokens, actualStates } = response.data
          this.setState({
            room: infoUser.room,
            taskFinished,
            totalTasks,
            totalTokens,
            actualStates
          }, () => {

            data = { userId: this.state.googleId, room: this.state.room }
            axios.post("http://localhost:9000/api/works/seeOwnTasks", { data })
              .then((response) => {
                this.setState({ data: this.filterDate(response.data) }, () => {
                })
              })
          })
        }).catch((error) => {
          console.log('error :', error);
        })
    })
  }

  filterDate = tasks => {
    let actualDate = new Date()
    let nextTasks = []

    tasks.forEach((task) => {
      // if (task.date > new Date){
      //   nextTasks.push(task)
      // }
    }
    )

  }

  componentDidUpdate() {
    this.logout()
  }

  logout = _ => {
    if (!localStorage.getItem('SessionToken') || this.state.redirect) {
      this.props.history.push('/login')
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
      { name: 'Terminadas', value: this.state.taskFinished, fill: "#228B22" },
      { name: 'Sin Terminar', value: this.state.totalTasks - this.state.taskFinished, fill: "#DC143C" }
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
                      <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tareas completadas
                    <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.taskFinished}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body">
                      <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tareas sin completar
                    <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.totalTasks - this.state.taskFinished}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3 center-text">Tokens totales
                    <i className="mdi mdi-diamond mdi-24px float-right center-text"></i>
                      </h4>
                      <h2 className="mb-5 center-text">{this.state.totalTokens}</h2>
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
                        data={this.getStateData(this.state.actualStates)}
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
                <div className="col-md-5 grid-margin stretch-card">
                  <div className="card bar-chart-cell-pie">
                    <div className="card-body">
                      <h4 className="card-title">Gráfica tareas completas/incompletas</h4>
                      <div className="pie-chart-css">
                      <PieChart width={300} height={300}>
                    <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} label />
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