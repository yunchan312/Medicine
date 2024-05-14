import Category from "../components/Category";
import { useRecoilValue } from "recoil";
import { filterTag, userState } from "../atom";
import SelectedTag from "../components/SelectedTag";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const filter = useRecoilValue(filterTag);
  const tags = [
    "간",
    "눈",
    "피부",
    "수면",
    "혈액순환",
    "에너지",
    "면역",
    "소화",
    "다이어트",
    "뼈",
    "관절",
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around items-center">
      <div className="border-2 w-[80%] border-black rounded-2xl py-5 flex flex-col justify-center items-center my-10">
        <div className="py-2">태그를 골라주세요</div>
        <div className="w-[80%] flex flex-wrap justify-center items-center gap-4">
          {tags.map((tag, i) => {
            return <Category key={i} tag={tag} />;
          })}
        </div>
      </div>
      <div className="w-[80%] mt-5 text-center flex flex-wrap justify-center gap-3">
        {filter.map((tag, i) => {
          return <SelectedTag key={i} tag={tag} />;
        })}
      </div>
      <div
        onClick={() => navigate(`/result/${filter}`)}
        className="py-1 px-4 bg-purple-100 rounded-full my-10 cursor-pointer"
      >
        NEXT
      </div>
    </div>
  );
}
