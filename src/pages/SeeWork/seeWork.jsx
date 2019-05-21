import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class seeWork extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            redirect: false,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        })
    }

    componentWillMount() {
        this.logout()

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
                        googleId: infoUser.googleId
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


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-4 sidebar1">
                            <MenuHOC onLogout={this.logoutFather} />
                        </div>
                        <div className="col-md-10 col-sm-8 main-content">

                            {this.state.data.map((person, index) => (
                                <p>Hello, {index}!</p>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
