import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart
} from 'recharts';
import axios from 'axios'
// const config = require('config')
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
      { name: 'Terminadas', value: this.state.taskFinished, fill : "#228B22" },
      { name: 'Sin Terminar', value: this.state.totalTasks - this.state.taskFinished, fill : "#DC143C"  }
    ];

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
                        {this.state.userName}
                          Tareas completas</h4>
                        <p className="group inner list-group-item-text">
                          {this.state.taskFinished}/{this.state.totalTasks}
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
                          {this.state.totalTokens}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="thumbnail card">
                      <div className="caption card-body">
                        <h4 className="group card-title inner list-group-item-heading">
                          Próxima tarea</h4>
                        <p className="group inner list-group-item-text">
                          0/0
                        </p>
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
        </div>
      </div>
    )
  }
}