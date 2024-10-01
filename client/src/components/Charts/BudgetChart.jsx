import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from 'recharts';
import "./budget.scss"
//dammy data
const data = [
    { name: 'Group A', value: 400, color: '#8884d8' },
    { name: 'Group B', value: 300, color: '#82ca9d' },
    { name: 'Group C', value: 300, color: '#ffc658' },
    { name: 'Group D', value: 200, color: '#FF0000' },
];

const BudgetChart = () => {
  return (
 
    <ResponsiveContainer width="100%" height="100%" >
        <PieChart width={400} height={400} margin={{ top: 10, right: 100, bottom: 10, left: 0 }}>
            <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ padding: 0 }} iconType={'circle'} />
            <Pie
            dataKey={'value'}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2} 
            >
                <Label value="Budgets" position="center" />
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default BudgetChart
