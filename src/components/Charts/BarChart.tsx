import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Support", tickets: 100 },
  { name: "Development", tickets: 150 },
  { name: "Sales", tickets: 75 },
  { name: "HR", tickets: 30 },
];

export function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tickets" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
