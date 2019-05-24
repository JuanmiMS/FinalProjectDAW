import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import Drawer from 'react-drag-drawer'
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
                    console.log('response :', response.data);
                    this.setState({ data: response.data }, () => {
                        console.log('this.data :', this.state.data);
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
                                <div id="products">
                                    {this.state.data.map((task, index) => (
                                        <Link to={`/taskInfo/${task.idWork}`}>
                                        <div id={`carta` + index} key={index} className="item col-xs-4 col-lg-4">
                                            <div className="thumbnail card">
                                                <div className="caption card-body">
                                                    <h4 className="group card-title inner list-group-item-heading">
                                                        {task.title}</h4>
                                                    <p className="group inner list-group-item-text">
                                                        {this.formatText(task.description)}</p>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-md-6">
                                                            <p className="lead">
                                                                {task.date}
                                                            </p>

                                                            <p className="lead">
                                                                Tokens: {task.totalTokens}
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
        )
    }
}
