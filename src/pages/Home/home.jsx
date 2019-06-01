import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
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
      axios.post("http://localhost:9000/api/home/taskData", { data })
        .then((response) => {

          const { taskFinished, totalTasks, totalTokens } = response.data
          this.setState({
            room: infoUser.room,
            taskFinished,
            totalTasks,
            totalTokens
          }, () => {

            //TODO lvl 1 TAREA MÁS ACTUAL
            console.log('this.state', this.state)
            data = { userId: this.state.googleId, room: this.state.room }
            axios.post("http://localhost:9000/api/works/seeOwnTasks", { data })
              .then((response) => {
                this.setState({ data: this.filterDate(response.data) }, () => {
                  console.log('this.state.data', this.state.data)
                })
              })
          })
        }).catch((error) => {
          console.log('error :', error);
        })
    })
  }

  filterDate = tasks => {
    let actualDate = new Date
    let nextTasks = []

    tasks.forEach((task) => {
      // console.log(task.date+" --- "+ new Date)
      // console.log('task.date > new Date', task.date > new Date)
      if (task.date > new Date){
        nextTasks.push(task)
      }
    }
    )
      console.log('nextTasks :', nextTasks);


    


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

    const data = [
      {
        name: 'Damián A', uv: 5200
      },
      {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
      },
      {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
      },
      {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
      },
      {
        name: 'Page E', pv: 4800
      },
      {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
      },
      {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
      },
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

                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                  <div style={{ backgroundColor: "red" }}></div>
                  <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 10, right: 30, left: 0, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}