import ANKO_DATA from "../assets/datas/ANKO_DATA";
import { CardObject } from "../types/card";

// 데이터 랜덤 정렬 함수
export const shuffle = (array: Array<CardObject>) => {
  let shuffleArray = array.sort(() => Math.random() - 0.5);
  return shuffleArray;
};

export const randomCardList = shuffle([...ANKO_DATA]);
