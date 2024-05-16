import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function SexChart({ data }) {
  const [count, setCount] = useState([]);

  useEffect(() => {
    const getData = () => {
      let male = 0;
      let female = 0;
      data.map((d) => {
        if (d.sex === "male") {
          male = male + 1;
        } else {
          female = female + 1;
        }
      });
      setCount([male, female]);
    };
    getData();
  }, [data]);

  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              color: "black",
            },
          },
          value: {
            color: "#26a0fc",
          },
          total: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["black"],
      },
    },
    legend: {
      show: false,
    },
    fill: {
      colors: ["#26a0fc", "#ff6178"],
    },
    labels: ["Male", "Female"],
    responsive: [
      {
        breakpoint: 480,
      },
    ],
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start px-5 font-bold">성비</div>
      <Chart options={options} series={count} type="donut" width={350} />
    </div>
  );
}
