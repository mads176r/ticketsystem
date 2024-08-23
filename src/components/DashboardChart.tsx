import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", open: 4000, closed: 2400, inProgress: 2400 },
  { name: "Feb", open: 3000, closed: 1398, inProgress: 2210 },
  { name: "Mar", open: 2000, closed: 9800, inProgress: 2290 },
  { name: "Apr", open: 2780, closed: 3908, inProgress: 2000 },
  { name: "May", open: 1890, closed: 4800, inProgress: 2181 },
  { name: "Jun", open: 2390, closed: 3800, inProgress: 2500 },
  { name: "Jul", open: 3490, closed: 4300, inProgress: 2100 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="#8884d8" />
        <Line type="monotone" dataKey="In Progress" stroke="#82ca9d" />
        <Line type="monotone" dataKey="closed" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
}
