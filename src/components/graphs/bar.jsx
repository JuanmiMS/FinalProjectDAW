import React, { Component } from 'react'
import {
   XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart
} from 'recharts';

export default class BarChartHOC extends Component {
    getStateData = info => {
        let data = []
        if (info !== undefined) {
            data = [
                {
                    Mal: info[0]
                },
                {
                    Regular: info[1]
                },
                {
                    Bien: info[2]
                },
                {
                    "Muy bien": info[3]
                }
            ]

            return data
        }

    }


    render() {
        return (
            <div className="col-md-5 grid-margin stretch-card">
                <div className="card bar-chart-cell">
                    <div className="card-body">
                        <div className="clearfix">
                            <h4 className="card-title float-left">Estado de las tareas</h4>
                            <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right">

                            </div>
                            <BarChart
                                width={500}
                                height={300}
                                data={this.getStateData(this.props.states)}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="1 4" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Mal" fill="#ef6464" />
                                <Bar dataKey="Regular" fill="#FFBE96" />
                                <Bar dataKey="Bien" fill="#2892E6" />
                                <Bar dataKey="Muy bien" fill="#24D0B7" />
                            </BarChart>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
