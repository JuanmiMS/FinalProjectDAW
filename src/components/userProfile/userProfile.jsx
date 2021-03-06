import React, { Component } from 'react'
import './userProfile.css'


export default class userProfile extends Component {
    render() {
        return (
                <div className="profile grid-margin stretch-card">
                  <img align="left" className="image-profile thumbnail userTop" src={this.props.userImage} />
                  <h2 className="userTop userName" style={{ marginTop: '3vh', marginLeft: '15px' }}>{this.props.userName}</h2>
                </div>
        )
    }
}
