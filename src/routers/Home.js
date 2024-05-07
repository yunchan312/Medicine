import { useState } from "react";
import { useSetRecoilState } from "recoil";
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
      height: e.target[2].value,
      weight: e.target[3].value,
    });
    navigate("/search");
  };

  return (
    <div className="flex justify-center items-center  py-10">
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
          <div className="font-bold">키</div>
          <input
            required
            className="border-b-2 border-black py-1"
            type="number"
            placeholder="height"
          />
        </div>
        <div>
          <div className="font-bold">몸무게</div>
          <input
            required
            className="border-b-2 border-black py-1"
            type="number"
            placeholder="weight"
          />
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
