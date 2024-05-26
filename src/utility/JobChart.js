import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";

export default function JobChart() {
  const [count, setCount] = useState([]);
  const [isChart, setIsChart] = useState(false);
  const { id } = useParams();

  const fetch = async () => {
    try {
      const mediRef = doc(database, "like", `${id}`);
      const result = await getDoc(mediRef);
      const job = result.data().job;
      let res = [0, 0, 0, 0, 0, 0, 0];
      job.map((a) => {
        if (a === "inoccupation") {
          res[0] += 1;
        } else if (a === "student") {
          res[1] += 1;
        } else if (a === "office") {
          res[2] += 1;
        } else if (a === "public") {
          res[3] += 1;
        } else if (a === "freelancer") {
          res[4] += 1;
        } else if (a === "self") {
          res[5] += 1;
        } else if (a === "retiree") {
          res[6] += 1;
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
            x: "무직",
            y: count[0],
          },
          {
            x: "학생",
            y: count[1],
          },
          {
            x: "직장인",
            y: count[2],
          },
          {
            x: "공무원",
            y: count[3],
          },
          {
            x: "프리랜서",
            y: count[4],
          },
          {
            x: "자영업자",
            y: count[5],
          },
          {
            x: "퇴직자",
            y: count[6],
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {isChart ? (
        <>
          <div className="self-start px-5 font-bold">직업</div>
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
