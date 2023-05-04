import styled from "styled-components";
import { useEffect, useState } from "react";

// 필요한 컴포넌트 호출
import Header from "./Header";
import LevelNav from "./LevelNav";
import CardSection from "./Card/CardSection";
import ResetBtn from "./ResetBtn";
import SuccessModal from "./SuccessModal";

// 랜덤 처리한 카드 이미지 데이터 호출
import {
  EasyRandomList,
  NormalRandomList,
  HardRandomList,
} from "../utils/shuffleData";

export const Main = () => {
  // 선택 된 레벨을 저장하는 state, default 값은 EASY 레벨로 지정
  const [currLevel, setCurrLevel] = useState("EASY");
  // 현재 점수를 저장하는 state
  const [currScore, setCurrScore] = useState(0);
  // 리셋 버튼을 눌렀는지 여부를 저장하는 state
  const [isReset, setIsReset] = useState(false);
  // 게임이 끝나 성공 축하 모달이 열렸는지 여부를 저장하는 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선택된 레벨에 따라 카드 리스트(개수 다르게)를 shuffleData에서 불러오고, totalScore도 다르게 지정
  let currCardList;
  let totalScore;
  switch (currLevel) {
    case "EASY":
      currCardList = EasyRandomList;
      totalScore = 5;
      break;
    case "NORMAL":
      currCardList = NormalRandomList;
      totalScore = 7;
      break;
    case "HARD":
      currCardList = HardRandomList;
      totalScore = 9;
      break;
  }

  // 점수가 만점이 되면 모달을 불러오기 위한 useEffect
  useEffect(() => {
    if (currScore === totalScore) {
      setIsModalOpen(true);
    }
  }, [currScore, totalScore]);

  // 모달에서 돌아가기 버튼 클릭시 모달을 닫아주기 위한 함수, successModal 컴포넌트로 전달한다
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header currScore={currScore} totalScore={totalScore} />
      <StMainContainer>
        <LevelNav currLevel={currLevel} setCurrLevel={setCurrLevel}></LevelNav>
        <CardSection
          currLevel={currLevel}
          currCardList={currCardList}
          currScore={currScore}
          setCurrScore={setCurrScore}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </StMainContainer>
      <ResetBtn setIsReset={setIsReset} />
      {isModalOpen && <SuccessModal handleModalClose={handleModalClose} />}
    </>
  );
};

export default Main;

// main 영역 (레벨 선택 + 카드 섹션) css
const StMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;
