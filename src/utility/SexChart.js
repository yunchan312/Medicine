import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function SexChart() {
  const [count, setCount] = useState([]);
  const [isChart, setIsChart] = useState(false);
  const { id } = useParams();

  const fetch = async () => {
    try {
      const mediRef = doc(database, "like", `${id}`);
      const result = await getDoc(mediRef);
      const sex = result.data().sex;
      let res = [0, 0];
      sex.map((s) => {
        if (s === "male") {
          res[0] += 1;
        } else {
          res[1] += 1;
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
      {isChart ? (
        <>
          <div className="self-start px-5 font-bold">성비</div>
          <Chart options={options} series={count} type="donut" width={350} />
        </>
      ) : (
        <div className="border-4 rounded-full my-5 border-purple-300 w-full px-5 text-center">
          좋아요 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
