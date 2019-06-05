import React, { Component } from 'react'
import {
    Pie, PieChart, Tooltip, Legend
} from 'recharts';


export default class PieChartHOC extends Component {
    
    render() {
        const data = [
            { name: 'Terminadas', value: this.props.taskFinished, fill: "#24D0B7" },
            { name: 'Sin Terminar', value: this.props.unFinished, fill: "#ef6464" }
          ];

        return (
            <div className="col-md-5 grid-margin stretch-card">
                  <div className="card bar-chart-cell-pie">
                    <div className="card-body">
                      <h4 className="card-title">Gráfica tareas completas/incompletas</h4>
                      <div className="pie-chart-css">
                        <PieChart width={300} height={300}>
                          <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} label />
                          <Legend />
                          <Tooltip />

                        </PieChart>
                      </div>
                    </div>
                  </div>
                </div>
        )
    }
}
