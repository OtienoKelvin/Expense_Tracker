import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Legend, Label, XAxis, YAxis } from 'recharts'

//dammy data
const data = [
  { name: 'Group A', value: 400, color: '#8884d8' },
  { name: 'Group B', value: 300, color: '#82ca9d' },
  { name: 'Group C', value: 300, color: '#ffc658' },
  { name: 'Group D', value: 200, color: '#FF0000' },
  { name: 'Group E', value: 278, color: '#FF0000' },
  { name: 'Group F', value: 189, color: '#FF0000' },
];

const CategoryBarChart = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={400} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis dataKey={'value'}/>
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default CategoryBarChart
