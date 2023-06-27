import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { modalStatusAtom, resetStatusAtom } from "../recoil/atom";
import {
  currLevelSelector,
  currScoreSelector,
  totalScoreSelector,
} from "../recoil/selector";
// 랜덤 처리한 카드 이미지 데이터 호출
import { randomCardList, shuffle } from "../utils/shuffleData";
// 필요한 컴포넌트 호출
import CardSection from "./Card/CardSection";
import Header from "./Header";
import LevelNav from "./LevelNav";
import ResetBtn from "./ResetBtn";
import SuccessModal from "./SuccessModal";

export const Home = () => {
  // 레벨에 따른 카드 리스트 상수 정의 (util 파일이 아닌 여기서 호출해야 useEffect 처리 가능)
  const EASY_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 5),
    ...randomCardList.slice(0, 5),
  ]);

  const NORMAL_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 7),
    ...randomCardList.slice(0, 7),
  ]);

  const HARD_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 9),
    ...randomCardList.slice(0, 9),
  ]);
  // 레벨에 따른 total score 상수 정의
  const EASY_SCORE = 5;
  const NORMAL_SCORE = 7;
  const HARD_SCORE = 9;

  // game에 필요한 정보들(현재 레벨, 점수, 레벨에 따른 총 점수)를 recoil의 gameStateAtom에 정의해놓고, 필요한 값을 각각의 selector를 통해 불러와 사용
  // 현재 레벨을 저장하는 selector
  const currLevel = useRecoilValue(currLevelSelector);
  // 현재 점수를 저장하는 selector
  const currScore = useRecoilValue(currScoreSelector);
  // 선택된 레벨에 따른 전체 점수를 저장하고, 새로운 값으로 설정해주는 selector
  const [totalScore, setTotalScore] = useRecoilState(totalScoreSelector);

  // reset 되었는지를 판단하는 플래그를 recoil의 resetStatusAtom에서 관리
  const isReset = useRecoilValue(resetStatusAtom);
  // modal이 open 될지를 판단하는 플래그를 recoil의 modalStatusAtom에서 관리
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalStatusAtom);

  // 선택된 레벨에 따라 카드 리스트(개수 다르게)를 shuffleData에서 불러옴.
  const [currCardList, setCurrCardList] = useState(EASY_RANDOM_LIST);

  // 레벨에 따른 셔플된 카드리스트와 총 점수를 불러오는 함수
  const shuffleCardList = () => {
    switch (currLevel) {
      case "EASY":
        setCurrCardList(EASY_RANDOM_LIST);
        setTotalScore(EASY_SCORE);
        break;
      case "NORMAL":
        setCurrCardList(NORMAL_RANDOM_LIST);
        setTotalScore(NORMAL_SCORE);
        break;
      case "HARD":
        setCurrCardList(HARD_RANDOM_LIST);
        setTotalScore(HARD_SCORE);
        break;
    }
  };

  useEffect(() => {
    shuffleCardList();
  }, [currLevel, isReset]);

  // 점수가 만점이 되면 모달을 불러오기 위한 useEffect
  useEffect(() => {
    if (currScore === totalScore) {
      setIsModalOpen(true);
    }
  }, [currScore, totalScore]);

  return (
    <>
      <Header />
      <StMainContainer>
        <LevelNav />
        <CardSection currCardList={currCardList} />
      </StMainContainer>
      <ResetBtn />
      {isModalOpen && <SuccessModal />}
    </>
  );
};

export default Home;

// main 영역 (레벨 선택 + 카드 섹션) css
const StMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;
