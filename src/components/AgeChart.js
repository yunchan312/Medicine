import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function AgeChart({ data }) {
  const [count, setCount] = useState([]);

  useEffect(() => {
    const getData = () => {
      let age = [0, 0, 0, 0, 0, 0, 0, 0];
      data.map((d) => {
        if (Math.floor(d.age / 10) >= 7) {
          age[7] += 1;
        } else {
          age[Math.floor(d.age / 10)] += 1;
        }
      });
      setCount(age);
    };
    getData();
  }, [data]);

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },

    series: [
      {
        data: [
          {
            x: "10대이하",
            y: count[0],
          },
          {
            x: "10대",
            y: count[1],
          },
          {
            x: "20대",
            y: count[2],
          },
          {
            x: "30대",
            y: count[3],
          },
          {
            x: "40대",
            y: count[4],
          },
          {
            x: "50대",
            y: count[5],
          },
          {
            x: "60대",
            y: count[6],
          },
          {
            x: "그 이상",
            y: count[7],
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start px-5 font-bold">나이</div>
      <Chart options={options} series={options.series} type="bar" width={500} />
    </div>
  );
}
