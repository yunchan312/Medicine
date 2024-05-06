import { useRecoilValue } from "recoil";
import { filterTag, userState } from "../atom";
import { useEffect } from "react";
import { data } from "../data.js";

export default function Result() {
  const user = useRecoilValue(userState);
  const filter = useRecoilValue(filterTag);
  const medicines = data.row;

  return <div>result</div>;
}
