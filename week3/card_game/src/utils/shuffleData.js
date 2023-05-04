import ANKO_DATA from "../assets/datas/ANKO_DATA";

// 데이터 랜덤 정렬 함수
const shuffle = (array) => {
  let shuffleArray = array.sort(() => Math.random() - 0.5);
  return shuffleArray;
};

let randomCardList = shuffle([...ANKO_DATA]);

export const EasyRandomList = shuffle([
  ...randomCardList.slice(0, 5),
  ...randomCardList.slice(0, 5),
]);

export const NormalRandomList = shuffle([
  ...randomCardList.slice(0, 7),
  ...randomCardList.slice(0, 7),
]);

export const HardRandomList = shuffle([
  ...randomCardList.slice(0, 9),
  ...randomCardList.slice(0, 9),
]);
