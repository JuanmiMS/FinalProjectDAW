import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import './taskInfo.css'
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
        let id = this.props.match.params.taskId
        this.setState({
            name: infoUser.name,
            googleId: infoUser.googleId,
            id
        }, () => {
            
        })
        let sendId = { id: this.props.match.params.taskId }
        axios.post("http://localhost:9000/api/ownTask/seeUniqueWork", { sendId })
            .then((response) => {
                const { _id, title, description, date, completed, totalTokens, actualState } = response.data
                this.setState({
                    actualWork: {
                        id : _id,
                        title,
                        description,
                        date,
                        completed,
                        totalTokens,
                        actualState
                    }
                })


                console.log('this.state :', this.state);
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



    render() {


        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-4 sidebar1">
                            <MenuHOC onLogout={this.logoutFather} />
                        </div>
                        <div className="col-md-10 col-sm-8 main-content">
                            <h2>ID: {this.state.actualWork.id}</h2>
                            <h2>Titulo: {this.state.actualWork.title}</h2>
                            <h2>description: {this.state.actualWork.description}</h2>
                            <h2>Fecha: {this.state.actualWork.date}</h2>
                            <h2>Tokens: {this.state.actualWork.totalTokens}</h2>
                            <h2>Completed: {this.state.actualWork.completed}</h2>
                            <h2>Estado actual: {this.state.actualWork.actualState}</h2>
                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}
