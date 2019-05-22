import React, { Component } from 'react'
import MenuHOC from '../../components/menu/menu';
import axios from 'axios'
import Drawer from 'react-drag-drawer'
import './seeWork.css'
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

export default class seeWork extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            redirect: false,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
            let data = { room: this.state.room }
            axios.post("http://juanmi.ovh:9000/api/works/seeAll", { data })
                .then((response) => {
                    this.setState({ data: response.data })
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
        axios.post("http://juanmi.ovh:9000/api/works/seeUniqueWork", { sendId })
            .then((response) => {

                const { title, description, date } = response.data

                this.setState({
                    toggle: !toogle,
                    actualWork: {
                        title,
                        description,
                        date
                    }
                })
            })
    }

    formatText = text => {
        return text !== undefined ? text.substring(1, 250) + "..." : ""
    }

    logState = () => {
        console.log(`Drawer now ${this.state.open ? 'open' : 'closed'}`)
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
                                    {this.state.data.map((work, index) => (
                                        <div id={`carta` + index} key={index} className="item col-xs-4 col-lg-4" onClick={() => this.toggle(work._id)}>
                                            <div className="thumbnail card">
                                                <div className="img-event">
                                                    <img className="group list-group-image img-fluid" src="http://placehold.it/300x250/000/fff" alt="" />
                                                </div>
                                                <div className="caption card-body">
                                                    <h4 className="group card-title inner list-group-item-heading">
                                                        {work.title}</h4>
                                                    <p className="group inner list-group-item-text">
                                                        {this.formatText(work.description)}</p>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-md-6">
                                                            <p className="lead">
                                                                {work.date}
                                                            </p>
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
                    <div className="modal-content" style={{ width: '90%', marginLeft : '5%', marginTop : '5%' }}>
                        <div className="modal-header">
                            {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                            <h4 className="modal-title">{this.state.actualWork.title}</h4>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.actualWork.description}</p>
                            <p>{this.state.actualWork.date}</p>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}
