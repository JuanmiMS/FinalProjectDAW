import React, { Component } from 'react'


export default class Card extends Component {

    render() {
        return (
            <div className="col-md-4 stretch-card grid-margin">
                <div className={`card bg-gradient-${this.props.type} card-img-holder text-white`}>
                    <div className="card-body">
                        <img src="../images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                        <h4 className="font-weight-normal mb-3 center-text">{this.props.title}
                            <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5 center-text">{this.props.info}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
