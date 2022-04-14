import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export class Chart extends PureComponent {
  render() {

    const {attribute} = this.props;
    const data = [];
    const others = {
      name: 'Inne',
      value: 0
    };

    if (attribute) {
      for (let [key, value] of Object.entries(attribute)) {
        let obj = {
          name: key,
          value: value
        };
  
        if (parseFloat(value) / 100 >= 0.005) {
          data.push(obj);
        } else {
          others.value += value;
        }
      };

      data.push(others);
    }


    return (
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          innerRadius={0}
          outerRadius={200}
          labelLine={true}
          label
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
