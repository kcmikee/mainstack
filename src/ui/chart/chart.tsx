"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    visit: 500,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2900,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 1080,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1090,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];

const Chart = () => {
  return (
    <div className={" h-[350px] p-5 rounded-xl"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" ticks={["Sun", "Sat"]} />
          {/* <YAxis /> */}
          {/* <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} /> */}
          {/* <Legend /> */}
          <Line
            type="natural"
            dataKey="visit"
            stroke="#ff5403"
            dot={false}
            strokeWidth={2}
            // strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
