// src/atoms/counterAtom.js
import { atom } from "recoil";

const AccountState = atom({
  key: "AccountState",
  default: false,
});

export default AccountState;
