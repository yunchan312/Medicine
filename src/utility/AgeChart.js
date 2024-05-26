import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { database } from "../firebase";

export default function AgeChart() {
  const [count, setCount] = useState([]);
  const [isChart, setIsChart] = useState(false);
  const { id } = useParams();

  const fetch = async () => {
    try {
      const mediRef = doc(database, "like", `${id}`);
      const result = await getDoc(mediRef);
      const age = result.data().age;
      let res = [0, 0, 0, 0, 0, 0, 0, 0];
      age.map((a) => {
        if (a >= 70) {
          res[7] += 1;
        } else {
          const i = Math.floor(a / 10);
          res[i] += 1;
        }
      });
      setCount(res);
      setIsChart(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

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
      {isChart ? (
        <>
          {" "}
          <div className="self-start px-5 font-bold">나이</div>
          <Chart
            options={options}
            series={options.series}
            type="bar"
            width={350}
          />
        </>
      ) : (
        <div className="border-4 rounded-full my-5 border-purple-300 w-full px-5 text-center">
          좋아요 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
