import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function GenreChart({ data = [] }) {
  console.log("chart data:", data); // 👈 check this

  return (
    <div>
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="movies" fill="#8884d8" />
    </BarChart>
    </div>
  );
}

export default GenreChart;
