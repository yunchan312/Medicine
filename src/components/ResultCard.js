import { getDownloadURL, ref } from "firebase/storage";
import { database, storage } from "../firebase";
import { useEffect, useState } from "react";
import Type from "./Type";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "../atom";
import { useNavigate } from "react-router-dom";

export default function ResultCard({
  PRDLST_NM,
  PRDLST_REPORT_NO,
  PRIMARY_FNCLTY,
  BSSH_NM,
  TYPE,
}) {
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState([]);
  const [likes, setLikes] = useState(0);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const getPhoto = async () => {
    try {
      const locationRef = ref(storage, `photo/${PRDLST_REPORT_NO}.jpg`);
      const photoUrl = await getDownloadURL(locationRef);
      setPhoto(photoUrl);
      setType(TYPE.split(", "));
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = async () => {
    getLikes();
    try {
      await addDoc(collection(database, `${PRDLST_REPORT_NO}`), {
        age: user.age,
        sex: user.sex,
        height: user.height,
        weight: user.weight,
      });
    } catch (e) {
      console.log(e);
    } finally {
      alert("추천 완료");
    }
  };
  const getLikes = async () => {
    try {
      const temp = await getDocs(collection(database, `${PRDLST_REPORT_NO}`));
      setLikes(temp.docs.length);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPhoto();
    getLikes();
  }, []);
  return (
    <div className="shadow-lg px-5 w-full flex-col flex gap-2 py-5">
      <div className="flex flex-col justify-center items-center">
        {photo ? (
          <img src={photo} />
        ) : (
          <div className="text-center font-bold text-xl py-24 border-4 border-purple-400 rounded-xl w-full">
            Loading...
          </div>
        )}
      </div>
      <div className="border-b-2 pb-2 flex items-center justify-between">
        <div className="text-[25px]">{PRDLST_NM}</div>
        <div className="cursor-pointer">
          <svg
            onClick={onClick}
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.5122 2.8077C2.85688 3.44413 1.53846 5.02066 1.53846 7.10947C1.53846 8.76178 2.28329 10.3458 3.47608 11.8749C4.6691 13.4044 6.26102 14.8165 7.85113 16.1178C8.49862 16.6477 8.93109 16.9999 9.29134 17.2276C9.63403 17.4443 9.832 17.4953 10 17.4953C10.168 17.4953 10.366 17.4443 10.7087 17.2276C11.0689 16.9999 11.5014 16.6477 12.1489 16.1178C13.739 14.8165 15.3309 13.4044 16.5239 11.8749C17.7167 10.3458 18.4615 8.76178 18.4615 7.10947C18.4615 5.02066 17.1431 3.44413 15.4878 2.8077C13.8475 2.17705 11.9178 2.48026 10.611 4.15139C10.4655 4.33752 10.2396 4.4467 10 4.4467C9.76042 4.4467 9.53452 4.33752 9.38898 4.15139C8.08223 2.48026 6.15246 2.17705 4.5122 2.8077ZM10 2.56094C8.25986 0.89808 5.91428 0.65187 3.94934 1.40735C1.75851 2.24968 0 4.34818 0 7.10947C0 9.21775 0.950832 11.1183 2.25293 12.7876C3.55481 14.4566 5.25702 15.9568 6.86386 17.2718L6.90027 17.3016C7.50171 17.7938 8.0067 18.2071 8.45616 18.4913C8.93222 18.7922 9.423 19 10 19C10.577 19 11.0678 18.7922 11.5438 18.4913C11.9933 18.2071 12.4983 17.7938 13.0997 17.3016L13.1361 17.2718C14.743 15.9568 16.4452 14.4566 17.7471 12.7876C19.0492 11.1183 20 9.21775 20 7.10947C20 4.34818 18.2415 2.24968 16.0507 1.40735C14.0857 0.65187 11.7401 0.89808 10 2.56094Z"
              fill="#201F29"
            ></path>
          </svg>
          <div>{likes}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="text-[15px]">{BSSH_NM}</div>

        <div className="flex gap-2">
          {TYPE.map((t, i) => (
            <Type key={i} type={t} />
          ))}
        </div>
      </div>
      <div>{PRIMARY_FNCLTY}</div>
      <div
        className="text-center py-1 rounded-full bg-purple-300 cursor-pointer hover:bg-purple-500"
        onClick={() => navigate(`/detail/${PRDLST_REPORT_NO}`)}
      >
        자세히보기
      </div>
    </div>
  );
}
