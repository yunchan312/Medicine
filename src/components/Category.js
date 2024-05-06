import { useRecoilState } from "recoil";
import { filterTag } from "../atom";

export default function Category({ tag }) {
  const [filter, setFilter] = useRecoilState(filterTag);
  const onClick = (e) => {
    const target = e.target.innerText;
    if (filter.includes(target)) {
      setFilter(filter.filter((tag) => tag !== target));
    } else {
      setFilter((prev) => [...prev, target]);
    }
  };
  return (
    <div
      onClick={onClick}
      name={tag}
      className="bg-purple-100 hover:bg-purple-300 px-2 rounded-full py-1 cursor-pointer"
    >
      {tag}
    </div>
  );
}
