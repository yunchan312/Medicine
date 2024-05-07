import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function HeightChart({ data }) {
  const [count, setCount] = useState([]);

  useEffect(() => {
    const getData = () => {
      data.map((d) => {
        setCount((prev) => [
          ...prev,
          [parseFloat(d.weight), parseFloat(d.height)],
        ]);
      });
    };
    getData();
  }, [data]);
  const options = {
    series: [
      {
        name: "키",
        data: count,
      },
    ],

    chart: {
      type: "scatter",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      tickAmount: 10,
      min: 0,
      max: 110,

      title: {
        text: "Weight",
      },
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      min: 110,
      max: 200,
      title: {
        text: "Height",
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start px-5 font-bold">신체정보</div>
      <Chart
        options={options}
        series={options.series}
        type="scatter"
        height={350}
        width={500}
      />
    </div>
  );
}
