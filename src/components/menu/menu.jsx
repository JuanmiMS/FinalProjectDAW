import React, { Component } from 'react'
import './menu.css'

export default class Menu extends Component {
    render() {
        return (
            <div>
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

                </div>
            </div>
        )
    }
}
