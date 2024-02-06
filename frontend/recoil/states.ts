import { atom } from "recoil";

export const selectedFirstGroup = atom<string[]>({
  key: "selectedFirstGroup",
  default: [],
});

export const selectedSecondGroup = atom<string[]>({
  key: "selectedSecondGroup",
  default: [],
});

export const myAllergyPathState = atom<string>({
  key: "myAllergyPathState",
  default: "/myAllergy",
});

export const selectedRestaurants = atom<string[]>({
  key: "selectedRestaurants",
  default: [],
});
