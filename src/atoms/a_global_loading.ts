import { RecoilState, atom } from "recoil";

export const AGlobalLoading: RecoilState<boolean> = atom({
  key: "GlobalLoading",
  default: true,
});
