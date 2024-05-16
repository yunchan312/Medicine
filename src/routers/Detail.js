import { collection, getDoc, getDocs } from "firebase/firestore";
import { database, storage } from "../firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { data } from "../Data.js";
import Type from "../components/Type.js";
import ChartData from "../utility/ChartData.js";

export default function Detail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [parm, setParm] = useState("");
  const [spec, setSpec] = useState("");
  const [type, setType] = useState([]);
  const [caution, setCaution] = useState("");
  const [inform, setInform] = useState("");
  const [how, setHow] = useState("");
  const [additive, setAdditive] = useState("");
  const getPhoto = async () => {
    try {
      const locationRef = ref(storage, `photo/${id}.jpg`);
      const photoUrl = await getDownloadURL(locationRef);
      setPhoto(photoUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const getDetail = () => {
    return data.C003.row.filter((medi) => medi.PRDLST_REPORT_NO === id);
  };

  useEffect(() => {
    const temp = getDetail();
    setTitle(temp[0].PRDLST_NM);
    setParm(temp[0].BSSH_NM);
    setSpec(temp[0].PRIMARY_FNCLTY);
    setType(temp[0].TYPE);
    setCaution(temp[0].IFTKN_ATNT_MATR_CN);
    setInform(temp[0].STDR_STND);
    setHow(temp[0].NTK_MTHD);
    setAdditive(temp[0].RAWMTRL_NM);
    getPhoto();
  }, []);
  return (
    <div className="flex flex-col px-2 gap-3">
      <img src={photo} className="self-center w-[70%]" />
      <div className="border-b-2 pb-2 flex justify-between px-3 items-end">
        <span className="text-[30px] w-[340px]">{title}</span>
      </div>
      <div className="px-5">{parm}</div>
      <div className="flex gap-2 px-5">
        {type.map((t, i) => (
          <Type key={i} type={t} />
        ))}
      </div>
      <div className="text-[20px] font-bold px-5">제품 관련 정보</div>
      <div className="px-5 font-bold">성능</div>
      <div className="px-5">{spec}</div>
      <div className="px-5 font-bold">주의사항</div>
      <div className="px-5">{caution}</div>
      <div className="px-5 font-bold">제품정보</div>
      <div className="px-5">{inform}</div>
      <div className="px-5 font-bold">용법</div>
      <div className="px-5">{how}</div>
      <div className="px-5 font-bold">첨가물</div>
      <div className="px-5">{additive}</div>
      <div>
        <div className="text-[20px] w-full font-bold px-5">
          좋아요 관련 정보
        </div>
        <ChartData />
      </div>
    </div>
  );
}
