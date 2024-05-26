import { useRecoilValue } from "recoil";
import { filterTag, userState } from "../atom";
import { useEffect, useState } from "react";
import { data } from "../Data";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const filter = useRecoilValue(filterTag);
  const user = useRecoilValue(userState);

  const [result, setResult] = useState([]);
  const medicines = data.C003.row;
  const searchResult = () => {
    const temp = new Set();
    filter.forEach((tag) => {
      medicines.forEach((medi) => {
        if (medi.TYPE.includes(tag)) {
          temp.add(medi);
        }
      });
    });
    setResult(Array.from(temp));
  };
  useEffect(() => {
    searchResult();
  }, []);
  return (
    <div className="flex flex-col w-full justify-center items-center ml-auto mr-auto">
      {result ? (
        result.map((res, i) => {
          return <ResultCard key={i} {...res} />;
        })
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
}
