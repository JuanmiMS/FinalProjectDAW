import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import './taskInfo.css'
import Toggle from 'react-toggle'
import InputNumber from 'react-input-number';
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
        let data = { id: this.props.match.params.taskId, googleId: infoUser.googleId }
        axios.post("http://juanmi.ovh:9000/api/ownTask/seeUniqueWork", { data })
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
                    room: infoUser.room,
                    rol : infoUser.rol
                })
            }
        }
    }

    logoutFather = _ => {
        this.setState({ redirect: true }, () => {
            console.log('LOGOUT!');
        })
    }

    updateCompleteStatus = _ => {
        let data = { id: this.state.taskOwnId, completed: this.state.completed }
        axios.post("http://juanmi.ovh:9000/api/ownTask/updateTaskFinish", { data })
            .then((response) => {
                this.setState({
                    completed: !this.state.completed
                })
            }).catch((error) => {
                console.log('error :', error);
            })
    }

    deteleTask = _ => {
        let data = { id: this.state.id, googleId: this.state.googleId }
        axios.post("http://juanmi.ovh:9000/api/ownTask/deleteTask", { data })
            .then((response) => {
                console.log('response', response)
            }).catch((error) => {
                console.log('error :', error);
            })
    }
    updateTaskTokens = _ => {
        let tok = document.getElementsByClassName('css-11mdgg1-InputNumber')[0].value
        this.setState({ totalTokens: tok })
        let data = { id: this.state.taskOwnId, tokens: tok }
        axios.post("http://juanmi.ovh:9000/api/ownTask/updateTaskTokens", { data })
            .then((response) => {
                // console.log('response', response)
            }).catch((error) => {
                // console.log('error :', error);
            })
    }

    getActualState = _ => {
        return <select className="form-control" style={{width: '50vh'}} value={this.state.actualState} onChange={this.changeOption} id="actualState">
            <option value="0">0 - Perdido</option>
            <option value="1">1 - Con dificultades</option>
            <option value="2">2 - Progresando con algunas dificultades</option>
            <option value="3">3 - Completando sin problemas</option>
        </select>
    }

    changeOption = event => {
        let actualState = document.getElementById('actualState').value
        this.setState({
            actualState
        }, () => {
            let data = { id: this.state.taskOwnId, state: actualState }
            axios.post("http://juanmi.ovh:9000/api/ownTask/updateTaskState", { data })
                .then((response) => {
                    // console.log('response', response)
                }).catch((error) => {
                    // console.log('error :', error);
                })
        })
    }

    deleteButton = _ =>{
        if (this.state.rol === "Profesor") {
            return <button type="button" className="btn btn-danger" onClick={this.deteleTask}>Borrar tarea</button>
          }
    }

    render() {

        let toggle;
        if (this.state.completed !== undefined) {
            toggle =
                <label>
                    ¿Completado?
                    <Toggle
                        defaultChecked={this.state.completed ? true : false}
                        onChange={this.updateCompleteStatus} />
                </label>
        }

        return (

            <div>
                <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper">
                        <nav className="sidebar sidebar-offcanvas" id="sidebar">
                            <MenuHOC onLogout={this.logoutFather} />
                        </nav>
                        <div className="main-panel" style={{ overflow: 'auto' }}>
                            <div className="content-wrapper">
                                <div className="page-header">
                                </div>
                                <div className="row">
                                    <div className="col-md-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body add-style">
                                                
                                                <h1 className="card-title">{this.state.title}</h1>
                                                <p className="card-description">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="inputBox">
                                                                Fecha límite: {this.state.date}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </p>
                                                <hr />
                                                <div className="row">
                                                    {this.state.description}
                                                </div>
                                                <hr />
                                                <p>Tokens:  <InputNumber min={0} max={100} step={1} value={this.state.totalTokens} onChange={this.updateTaskTokens} enableMobileNumericKeyboard /></p>
                                                <p>{toggle}</p>
                                                <p>Estado actual: {this.getActualState()}</p>
                                                <p>{this.state.completed}</p>

                                                <Link to="/seeWork"><button type="button" className="btn btn-gradient-primary mr-2">Ver Tareas</button></Link>
                                                {this.deleteButton}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            // <div>
            //     <div className="container-fluid">
            //         <div className="row">
            //             <div className="col-md-2 col-sm-4 sidebar1">
            //                 <MenuHOC onLogout={this.logoutFather} />
            //             </div>
            //             <div className="col-md-10 col-sm-8 main-content">
            //                 <h2>ID: {this.state.id}</h2>
            //                 <h2>Titulo: {this.state.title}</h2>
            //                 <h2>description: {this.state.description}</h2>
            //                 <h2>Fecha: {this.state.date}</h2>
            //                 <h2>Tokens:  <InputNumber min={0} max={100} step={1} value={this.state.totalTokens} onChange={this.updateTaskTokens} enableMobileNumericKeyboard /></h2>
            //                 <h2>{this.state.completed}</h2>
            //                 {toggle}
            //                 <h2>Estado actual: {this.getActualState()}</h2>

            //                 <Link to="/seeWork"><button type="button" className="btn btn-primary">Ver Tareas</button></Link>
            //                 <p></p>
            //                 <button type="button" className="btn btn-danger" onClick={this.deteleTask}>Borrar tarea</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}
