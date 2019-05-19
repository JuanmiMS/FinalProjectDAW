import React, { Component } from 'react'
import './example.css'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('SessionToken')
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('SessionToken') || !localStorage.getItem('roomId')) {
            console.log('se :');
            this.props.history.push('/')
        }
    }

    logout = () => {
        localStorage.removeItem('SessionToken')
        localStorage.removeItem('roomId')
        this.props.history.push('/')
    }

    render() {

        return (
            <div>
                <div>
                    <h1>Home</h1>
                    <button onClick={this.logout}>Logout</button>
                </div>
                {/* EMPEZAR IMPORT */}

                <div className="card card-stats">
                    <div className="card-body ">
                        <div className="row">
                            <div className="col-5 col-md-4">
                                <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon nc-globe text-warning"></i>
                                </div>
                            </div>
                            <div className="col-7 col-md-8">
                                <div className="numbers">
                                    <p className="card-category">Capacity</p>
                                    <p className="card-title">150GB
                                            </p><p>
                                    </p></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <div className="stats">
                            <i className="fa fa-refresh"> </i>Update Now
                                </div>
                    </div>


                    {/* FIN IMPORT       */}
                </div>
            </div>
        )
    }
}