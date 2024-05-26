import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "./firebase";
import { useEffect } from "react";

export default function Test() {
  const user = {
    age: "24",
    height: "188",
    sex: "male",
    weight: "85",
  };
  const hello = [];
  const onClick = () => {
    console.log(hello);
    hello.push("a");
    console.log(hello);
  };
  useEffect(() => {
    // const fetch = async () => {
    //   const likeRef = collection(database, "like");
    //   const response = await setDoc(doc(likeRef, "status"), {
    //     age: [],
    //     height: [],
    //     sex: [],
    //     weight: [],
    //   });
    //   console.log(response);
    // };
    // fetch();
  }, []);
  return (
    <div>
      <div onClick={onClick}>BUTTON</div>
    </div>
  );
}
