import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { database } from "../firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atom";

export const SortByLikes = async (temp, user) => {
  const userSex = user.sex;
  const userAge = user.age;
  const userJob = user.job;
  const arr = [];
  const ans = [];

  for (let i = 0; i < temp.length; i++) {
    const ref = doc(database, "like", `${temp[i]}`);
    const res = (await getDoc(ref)).data();
    const ageScore = countAge(res.age, userAge);
    const sexScore = countSex(res.sex, userSex);
    const jobScore = countJob(res.job, userJob);
    const score = Math.floor(
      ((ageScore + sexScore + jobScore) * 100) / (res.age.length * 3)
    );
    const id = temp[i];
    arr.push([id, score]);
  }

  const sorted = bubbleSort(arr);
  for (let j = 0; j < arr.length; j++) {
    ans.push(sorted[j][0]);
  }

  return ans;
};

const bubbleSort = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j][1] < arr[j + 1][1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const countAge = (ageList, myAge) => {
  let ans = 0;
  let userAge = Math.floor(myAge / 10) * 10;
  for (let i = 0; i < ageList.length; i++) {
    if (ageList[i] >= userAge && ageList[i] < userAge + 10) {
      ans += 1;
    }
  }
  return ans;
};

const countSex = (sexList, userSex) => {
  let ans = 0;
  for (let i = 0; i < sexList.length; i++) {
    if (sexList[i] === userSex) {
      ans += 1;
    }
  }
  return ans;
};

const countJob = (jobList, userJob) => {
  let ans = 0;
  for (let i = 0; i < jobList.length; i++) {
    if (jobList[i] === userJob) {
      ans += 1;
    }
  }
  return ans;
};
