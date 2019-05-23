import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import Drawer from 'react-drag-drawer'
import './seeWork.css'
import { finished } from 'stream';
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class seeWork extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            redirect: false,
            data: [],
            toggle: false,
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

    toggle = id => {
        let toogle = this.state.toggle
        let title = "titulo"
        let description = "description"
        let sendId = { id: id }
        axios.post("http://localhost:9000/api/works/seeUniqueWork", { sendId })
            .then((response) => {
                const { _id, title, description, date, completed, totalTokens } = response.data
                this.setState({
                    toggle: !toogle,
                    actualWork: {
                        id : _id,
                        title,
                        description,
                        date,
                        completed,
                        totalTokens
                    }
                })
                console.log('this.state :', this.state);
            })
    }

    formatText = text => {
        return text !== undefined ? text.substring(1, 250) + "..." : ""
    }

    logState = () => {
        console.log(`Drawer now ${this.state.open ? 'open' : 'closed'}`)
    }
    changeStatus = id => {
        console.log('id', id)
        let sendId = { id: id }
        axios.post("http://localhost:9000/api/works/updateTaskFinish", { sendId })
            .then((response) => {
                console.log("Cambiado!")
            })
    }

    render() {


        const { toggle } = this.state
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
                                        <div id={`carta` + index} key={index} className="item col-xs-4 col-lg-4" onClick={() => this.toggle(task.idWork)}>
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
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <div className="switch-container">
                                                                <label>
                                                                    <input ref="switch" checked={this.state.actualWork.completed} className="switch" type="checkbox" />
                                                                    <div>
                                                                        <div></div>
                                                                    </div>
                                                                </label>
                                                            </div>

                                                        </div>
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

                <Drawer
                    open={toggle}
                    onRequestClose={this.toggle}
                >
                    <div className="modal-content" style={{ width: '90%', marginLeft: '5%', marginTop: '5%' }}>
                        <div className="modal-header">
                            {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                            <h4 className="modal-title">{this.state.actualWork.title}</h4>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.actualWork.description}</p>
                            <p>{this.state.actualWork.date}</p>
                        </div>

                        <div className="switch-container">
                            <label>
                                <input ref="switch" checked={this.state.actualWork.completed} className="switch" type="checkbox" />
                                <div onClick={this.changeStatus(this.state.actualWork.id)} >
                                    <div onClick={this.changeStatus(this.state.actualWork.id)} ></div>
                                </div>
                            </label>
                        </div>

                    </div>
                </Drawer>
            </div>
        )
    }
}
