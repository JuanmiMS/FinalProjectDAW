import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import './seeWork.css'
import { Link } from 'react-router-dom';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class seeWork extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            redirect: false,
            data: [],
            actualWork: {}
        })
    }

    sortTasks = arr => {
        if (arr !== undefined && arr.length !== 0) {
            arr.sort((a, b) => a.date.localeCompare(b.date))
            return arr.reverse()
        }
    }

    componentWillMount() {
        this.logout()
        let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
        this.setState({
            name: infoUser.name,
            googleId: infoUser.googleId,
            room: infoUser.room
        }, () => {
            let data = { userId: this.state.googleId, room: this.state.room }
            axios.post("http://localhost:9000/api/works/seeOwnTasks", { data })
                .then((response) => {
                    this.setState({ data: this.sortTasks(response.data) }, () => {
                    })
                })
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
            let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)

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

    formatText = text => {
        return text !== undefined ? text.substring(1, 250) + "..." : ""
    }

    logState = () => {
        console.log(`Drawer now ${this.state.open ? 'open' : 'closed'}`)
    }

    isFinished = isComplete => {
        return isComplete ? "card bg-gradient-success card-img-holder text-white" : "card bg-gradient-danger card-img-holder text-white"
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
                            <div className="content-wrapper">
                                <div className="row">
                                    
                                    {this.state.data.map((task, index) => (
                                        
                                        <div className="col-4 stretch-card grid-margin">
                                            {/* <div className="card bg-gradient-success card-img-holder text-white"> */}
                                            <div className={this.isFinished(task.completed)}>
                                                <div className="card-body">
                                                    <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                                    <h2 className="font-weight-normal mb-3">{task.title}
                                                            <i className="mdi mdi-diamond mdi-24px float-right"></i>
                                                    </h2>
                                                    <div className="mb-">
                                                    <h4>Finish date: {task.date}</h4>
                                                    <Link to={`/taskInfo/${task.idWork}`} key={`carta` + index}>
                                                    <button style={{float: "right"}} type="button" className="btn btn-gradient-primary btn-fw">Ver tarea</button>
                                                    </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                       
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            /* <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-4 sidebar1">
                            <MenuHOC onLogout={this.logoutFather} />
                        </div>
                        <div className="col-md-10 col-sm-8 main-content">
                            <div className="container" style={{ marginTop: 50 }}>
                                <div id="products">
                                    <div className="row">

                                    {this.state.data.map((task, index) => (
                                        <Link to={`/taskInfo/${task.idWork}`} key={`carta` + index}>
                                        <div id={`carta` + index}  className="col-4">
                                            <div className="thumbnail card" style={{backgroundColor: this.isFinished(task.completed)}}>
                                                <div className="caption card-body">
                                                    <h4 className="group card-title inner list-group-item-heading">
                                                        {task.title}</h4>
                                                    <p className="group inner list-group-item-text">
                                                        {this.formatText(task.description)}</p>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-md-6">
                                                            <p className="lead">
                                                                Tokens: {task.totalTokens}
                                                            </p>
                                                            <p>
                                                                DATE: {task.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */
        )
    }
}
