import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import './taskInfo.css'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class seeWork extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            redirect: false,
        })

    }

    componentWillMount() {
        this.logout()
        let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
        let id = this.props.match.params.taskId
        let sendId = { id: this.props.match.params.taskId }
        axios.post("http://localhost:9000/api/ownTask/seeUniqueWork", { sendId })
            .then((response) => {
                const { title, description, date, completed, totalTokens, actualState, taskOwnId } = response.data
                this.setState({
                    name: infoUser.name,
                    googleId: infoUser.googleId,
                    taskOwnId,
                    id,
                    title,
                    description,
                    date,
                    completed,
                    totalTokens,
                    actualState
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
            let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
            if (this.state.name !== infoUser.name) {
                this.setState({
                    name: infoUser.name,
                    googleId: infoUser.googleId,
                    room: infoUser.room
                })
            }
        }
    }

    logoutFather = _ => {
        this.setState({ redirect: true }, () => {
            console.log('LOGOUT!');
        })
    }

    updateCompleteStatus = _ =>{
        
        console.log('this.state :', this.state);

        let sendId = { id: this.state.taskOwnId, completed : this.state.completed }
        axios.post("http://localhost:9000/api/ownTask/updateTaskFinish", { sendId })
            .then((response) => {
                // const { title, description, date, completed, totalTokens, actualState } = response.data
                console.log('response', response.data)
                this.setState({
                    completed: !this.state.completed
                })

            }).catch((error) => {
                console.log('error :', error);
            })

    }

    render() {

        let toggle;
        if (this.state.completed !== undefined) {
            toggle =
                <label >
                    <h2>Completed: </h2>
                    <Toggle
                        defaultChecked={this.state.completed ? true : false}
                        onChange={this.updateCompleteStatus} />
                </label>
        }

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-4 sidebar1">
                            <MenuHOC onLogout={this.logoutFather} />
                        </div>
                        <div className="col-md-10 col-sm-8 main-content">
                            <h2>ID: {this.state.id}</h2>
                            <h2>Titulo: {this.state.title}</h2>
                            <h2>description: {this.state.description}</h2>
                            <h2>Fecha: {this.state.date}</h2>
                            <h2>Tokens: {this.state.totalTokens}</h2>
                            <h2>Completed: {this.state.completed}</h2>
                            {toggle}
                            <h2>Estado actual: {this.state.actualState}</h2>
                            <Link to="/seeWork"><button type="button" className="btn btn-primary">Ver Tareas</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
