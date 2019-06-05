import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Card from '../../components/card/card';
import BarChartHOC from '../../components/graphs/bar';
import PieChartHOC from '../../components/graphs/pie';
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
    return (

<div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <MenuHOC onLogout={this.logoutFather} />
            </nav>
            <div className="main-panel">

              <div className="row">
                <Card title={'Tareas completadas'} type={'success'} info={this.state.user.taskFinished} />
                <Card title={'Tareas sin completar'} type={'danger'} info={this.state.user.unfinishedTasks} />
                <Card title={'Tokens totales'} type={'info'} info={this.state.user.totalTokens} />
              </div>

              <div className="row">


              <BarChartHOC states={this.state.user.actualStates}/>
              <PieChartHOC taskFinished={this.state.user.taskFinished} unFinished={this.state.user.unfinishedTasks}/>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}