import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './menu.css'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')



export default class Menu extends Component {

    constructor(props) {
        super(props)
        if(localStorage.getItem('SessionToken') === null){
            this.state = ({
                token: "nulo",
                imageUrl: "infoUser",
                room: "infoUser.roo",
                name: "infoUser.nam",
                rol: "infoUser.rol",
                redirect: false
            })
        }
        else{
        let infoUser = jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret)
            this.state = ({
                token: localStorage.getItem('SessionToken'),
                imageUrl: infoUser.imageUrl,
                room: infoUser.room,
                name: infoUser.name,
                rol: infoUser.rol,
                redirect: false
            })
        }
    }


    //TODO lvl 3
    check = () => {
        console.log("OK", jwt.verify(localStorage.getItem('SessionToken'), config.jwtSecret))

        //Falla llamada al pedir verificación
        axios.get("http://localhost:9000/api/users/checkUser", { data: "AAAAAAAAAAAAAAAAA" }).then((response) => {
            console.log('response :', response.data);
        })
    }



    logout = () => {
        localStorage.removeItem('SessionToken')
        localStorage.removeItem('roomId')
        this.props.onLogout()
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src={this.state.imageUrl} className="img-responsive center-block" alt="Logo" />
                </div>
                <div className="left-navigation">
                    <ul className="list">
                        <h5><strong>{this.state.rol} {this.state.name}</strong></h5>
                        <h5><strong>SALA: {this.state.room}</strong></h5>
                        <Link to="/"><li> Home</li></Link>
                        <Link to="/addWork"><li> Add Work</li></Link>
                    </ul>
                </div>
                <button onClick={this.check}>CheckUserTEST</button>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}
