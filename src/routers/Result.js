import { useRecoilValue } from "recoil";
import { filterTag, userState } from "../atom";
import { useEffect, useState } from "react";
import { data } from "../Data";
import ResultCard from "../components/ResultCard";
import { SortByLikes } from "../Func/SortByLikes";

export default function Result() {
  const filter = useRecoilValue(filterTag);
  const user = useRecoilValue(userState);

  const [result, setResult] = useState([]);
  const medicines = data.C003.row;
  const searchResult = async () => {
    const temp = new Set();
    filter.forEach((tag) => {
      medicines.forEach((medi) => {
        if (medi.TYPE.includes(tag)) {
          temp.add(medi.PRDLST_REPORT_NO);
        }
      });
    });
    //좋아요 순서에 맞게 sort
    const sortedList = await SortByLikes(Array.from(temp), user);
    let finalList = [];
    sortedList.forEach((id) => {
      finalList.push(
        medicines.filter((medi) => medi.PRDLST_REPORT_NO === id)[0]
      );
    });
    setResult(finalList);
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
