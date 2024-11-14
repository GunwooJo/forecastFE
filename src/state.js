import {atom} from "recoil";

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: localStorage.getItem("accessToken") || "", // localStorage에서 accessToken을 가져옴
});

export const regionsState = atom({
  key: 'regionsState',
  default: JSON.parse(localStorage.getItem("regions")) || []
});
