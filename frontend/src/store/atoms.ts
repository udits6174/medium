import { atom } from "recoil";

export const loggedInState = atom({
  key: "loggedInState",
  default: false
});
export const emailState = atom({
  key: "emailState",
  default: ""
});
export const usernameState = atom({
  key: "usernameState",
  default: "Anonymous"
});