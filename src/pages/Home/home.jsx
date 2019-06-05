import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart
} from 'recharts';
import axios from 'axios'
// const config = require('config')
import './home.css'
import Card from '../../components/card/card';
import BarChartHOC from '../../components/graphs/bar';
import PieChartHOC from '../../components/graphs/pie';
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
      axios.post("http://juanmi.ovh:9000/api/users/userInfo", { data })
        .then((response) => {

          const { taskFinished, totalTasks, totalTokens, actualStates, unfinishedTasks } = response.data
          this.setState({
            room: infoUser.room,
            taskFinished,
            totalTasks,
            totalTokens,
            actualStates,
            unfinishedTasks
          }, () => {

            data = { userId: this.state.googleId, room: this.state.room }
            axios.post("http://juanmi.ovh:9000/api/works/seeOwnTasks", { data })
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

                <Card title={'Tareas completadas'} type={'success'} info={this.state.taskFinished} />
                <Card title={'Tareas sin completar'} type={'danger'} info={this.state.unfinishedTasks} />
                <Card title={'Tokens totales'} type={'info'} info={this.state.totalTokens} />

              </div>

              <div className="row">

                <BarChartHOC states={this.state.actualStates}/>
                <PieChartHOC taskFinished={this.state.taskFinished} unFinished={this.state.unfinishedTasks}/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}