import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    sex: "male",
    age: 0,
    job: "inoccupation",
  },
});

export const filterTag = atom({
  key: "filterTags",
  default: [],
});

export const manageLikes = atom({
  key: "manageLikes",
  default: [],
});
