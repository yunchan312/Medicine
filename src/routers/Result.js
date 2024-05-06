import { useRecoilValue } from "recoil";
import { filterTag, userState } from "../atom";
import { useEffect, useState } from "react";
import { data } from "../data";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const filter = useRecoilValue(filterTag);
  const [result, setResult] = useState([]);
  const medicines = data.C003.row;
  const searchResult = () => {
    const temp = new Set();
    filter.forEach((tag) => {
      medicines.forEach((medi) => {
        if (medi.PRIMARY_FNCLTY.includes(tag)) {
          temp.add(medi);
        }
      });
    });
    setResult(Array.from(temp));
  };
  useEffect(() => {
    console.log(filter);
    searchResult();
    console.log(result);
  }, []);
  return (
    <div>
      {result.map((res, i) => {
        return <ResultCard key={i} {...res} />;
      })}
    </div>
  );
}
