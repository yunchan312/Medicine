import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { useParams } from "react-router-dom";
import SexChart from "../components/SexChart";
import AgeChart from "../components/AgeChart";
import HeightChart from "../components/HeightChart";

export default function ChartData() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    const fetchData = async () => {
      const dataQuery = query(collection(database, `${id}`));
      unsubscribe = onSnapshot(dataQuery, (snapshot) => {
        const dataMap = snapshot.docs.map((doc) => {
          const { age, height, weight, sex } = doc.data();
          return {
            id: doc.id,
            age,
            height,
            weight,
            sex,
          };
        });
        setData(dataMap);
      });
    };
    fetchData();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [id]);
  return (
    <div className="flex flex-col gap-3">
      <div className="py-5">
        <SexChart data={data} />
      </div>
      <div className="py-5">
        <AgeChart data={data} />
      </div>
      <div className="py-5">
        <HeightChart data={data} />
      </div>
    </div>
  );
}
