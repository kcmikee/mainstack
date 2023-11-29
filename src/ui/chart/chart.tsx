"use client";
import { useAppStore } from "@/store/appStore";
import compareDesc from "date-fns/compareDesc";
import React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

const Chart = () => {
  const [date, setDate] = React.useState([]);

  const filteredTransactions = useAppStore(
    (state: { filteredTransactions: any[] }) => state.filteredTransactions,
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (filteredTransactions.length > 0) {
      const newArr = filteredTransactions
        .sort((a, b) => compareDesc(new Date(b.date), new Date(a.date)))
        .map((trans: any) => {
          return {
            name: new Date(trans?.date).toDateString(),
            visit: Number(trans?.amount),
          };
        });
      console.log({ newArr });
      setData(newArr);

      const start = filteredTransactions[0]?.date;
      const end = filteredTransactions[filteredTransactions.length - 1]?.date;
      setDate([new Date(start).toDateString(), new Date(end).toDateString()]);
    } else {
      setData([
        { visit: 0, name: "0" },
        { visit: 0, name: "1" },
      ]);
    }

    return () => {
      setData([]);
      setDate([]);
    };
  }, [filteredTransactions]);

  return (
    <div className={"mt-6 h-[350px] rounded-xl p-5"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: 30,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey={data.length > 0 ? "name" : ""}
            domain={["dataMin", "dataMax"]}
            ticks={date}
          />
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
