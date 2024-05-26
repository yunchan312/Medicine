import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../atom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [sex, setSex] = useState("male");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    setUser({
      sex: e.target[0].value,
      age: e.target[1].value,
      job: e.target[2].value,
    });
    navigate("/search");
  };

  return (
    <div className="flex justify-center items-center py-10 h-[80vh]">
      <form
        onSubmit={onSubmit}
        className="border-2 bg-white border-black rounded-xl py-10 px-5 flex flex-col gap-5"
      >
        <div>
          <div className="font-bold">성별</div>
          <select className="border-b-2 border-black py-1 w-full">
            <option id="sex" value="male">
              남자
            </option>
            <option id="sex" value="female">
              여자
            </option>
          </select>
        </div>
        <div>
          <div className="font-bold">나이</div>
          <input
            className="border-b-2 border-black py-1"
            type="number"
            placeholder="age"
            required
          />
        </div>
        <div>
          <div className="font-bold">직업</div>
          <select className="border-b-2 border-black py-1 w-full">
            <option id="job" value="inoccupation">
              무직
            </option>
            <option id="job" value="student">
              학생
            </option>
            <option id="job" value="office">
              직장인
            </option>
            <option id="job" value="public">
              공무원
            </option>
            <option id="job" value="freelancer">
              프리랜서
            </option>
            <option id="job" value="self">
              자영업자
            </option>
            <option id="job" value="retiree">
              퇴직자
            </option>
          </select>
        </div>
        <input
          type="submit"
          value="NEXT"
          className="bg-purple-200 py-1 rounded-full"
        />
      </form>
    </div>
  );
}
