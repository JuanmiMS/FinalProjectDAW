import React, { Component } from 'react'
import './header.css'

export default class Header extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 col-sm-4 sidebar1">
                        <div className="logo">
                            <img src={this.props.infoUser.imageUrl} className="img-responsive center-block" alt="Logo" />
                        </div>
                            <div className="left-navigation">
                                <ul className="list">
                                    <h5><strong>{this.props.infoUser.name}</strong></h5>
                                    <li>Home</li>
                                    <li>Office</li>
                                    <li>School</li>
                                    <li>Gym</li>
                                    <li>Art Class</li>
                                    <li>Hike Club</li>
                                </ul>

                                    <ul className="list">
                                        <h5><strong>HOBBIES</strong></h5>
                                        <li>Hiking</li>
                                        <li>Rafting</li>
                                        <li>Badminton</li>
                                        <li>Tennis</li>
                                        <li>Sketching</li>
                                        <li>Horse Riding</li>
                                    </ul>
                </div>
                            </div>
                            <div className="col-md-10 col-sm-8 main-content">
                                {/* <!--Main content code to be written here -->  */}
                                <h1>FEEDBACK APPRECIATED! :)</h1>
                                <h3>P.S.: For side navbar with dropdown menu, you may refer this snippet: http://bootsnipp.com/user/snippets/kWPoW</h3>
                            </div>
    </div>
    </div>
                        )
                    }
                }
