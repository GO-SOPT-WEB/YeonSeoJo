import { selector } from "recoil";

import { gameStateAtom } from "./atom";

export const currLevelSelector = selector<string>({
  key: "currLevelSelector",
  get: ({ get }) => get(gameStateAtom).currLevel,
  set: ({ set }, newValue) => {
    set(gameStateAtom, (prev) => ({
      ...prev,
      currLevel: newValue as string,
    }));
  },
});

export const currScoreSelector = selector<number>({
  key: "currScoreSelector",
  get: ({ get }) => get(gameStateAtom).currScore,
  set: ({ set }, newValue) => {
    set(gameStateAtom, (prev) => ({
      ...prev,
      currScore: newValue as number,
    }));
  },
});

export const totalScoreSelector = selector<number>({
  key: "totalScoreSelector",
  get: ({ get }) => get(gameStateAtom).totalScore,
  set: ({ set }, newValue) => {
    set(gameStateAtom, (prev) => ({ ...prev, totalScore: newValue as number }));
  },
});
