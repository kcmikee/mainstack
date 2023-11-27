"use client";
import { useTransactionStore } from "@/store/transactionStore";
import React from "react";
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
  const [date, setDate] = React.useState([]);
  const transactions = useTransactionStore(
    (state: { transactions: any[] }) => state.transactions,
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (transactions.length) {
      const newArr = transactions.map((trans: any) => {
        return {
          name: new Date(trans?.date).toDateString(),
          visit: trans?.amount,
        };
      });
      setData(newArr);

      const start = transactions[0]?.date;
      const end = transactions[transactions.length - 1]?.date;
      setDate([new Date(start).toDateString(), new Date(end).toDateString()]);
    }

    return () => {
      setData([]);
      setDate([]);
    };
  }, []);

  return (
    <div className={" h-[350px] rounded-xl p-5"}>
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
          <XAxis dataKey="name" ticks={date} />
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
