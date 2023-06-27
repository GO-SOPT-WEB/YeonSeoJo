import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { resetStatusAtom } from "../../recoil/atom";
import { currLevelSelector, currScoreSelector } from "../../recoil/selector";
import { CardObject } from "../../types/card";
import Card from "./Card";

interface CardSectionProps {
  currCardList: Array<CardObject>;
}

export const CardSection = ({ currCardList }: CardSectionProps) => {
  // 클릭 된 카드의 idx를 저장하는 state
  const [clickedList, setClickedList] = useState<Array<number>>([]);
  // 클릭 된 카드의 카드 정보를 저장하는 state
  const [matchedList, setmatchedList] = useState<Array<CardObject>>([]);

  // 현재 레벨 정보를 저장하는 selector
  const currLevel = useRecoilValue(currLevelSelector);
  // 현재 점수를 바꾸는 selector
  const setCurrScore = useSetRecoilState(currScoreSelector);

  const [isReset, setIsReset] = useRecoilState(resetStatusAtom);

  // 카드 클릭 시 로직 처리를 위한 useEffect
  useEffect(() => {
    // 카드가 2개 선택되고, 그 두 카드 정보가 일치하면
    if (matchedList.length === 2) {
      if (matchedList[0] === matchedList[1]) {
        //카드 데이터의 matchedStatus를 true로 바꿔주고, score를 올려준다.
        matchedList[0].matchedStatus = true;
        setCurrScore((prev) => prev + 1);
      }
      // 일치하지 않으면 0.7초 뒤에 뒤집기
      setTimeout(() => {
        setmatchedList([]);
        setClickedList([]);
      }, 700);
    }
  }, [matchedList]);

  // 레벨이 바뀌거나, 리셋되면 초기화하기 위한 useEffect
  useEffect(() => {
    setmatchedList([]);
    setClickedList([]);
    setCurrScore(0);
    currCardList.forEach((card: CardObject) => {
      card.matchedStatus = false;
    });
    setIsReset(false);
  }, [currLevel, isReset]);

  // 카드 선택 시 관련 state를 바꿔주기 위한 함수, card 컴포넌트의 click 이벤트로 처리할 수 있게 넘겨준다
  const handleCardChoice = (card: CardObject, idx: number) => {
    setmatchedList([...matchedList, card]);
    setClickedList([...clickedList, idx]);
  };

  return (
    <StCardsContainer>
      {currCardList.map((card: CardObject, idx: number) => {
        return (
          <>
            <StCardWrapper key={`${card.id}-${idx}`}>
              <Card
                card={card}
                idx={idx}
                handleCardChoice={
                  clickedList.length < 2 ? handleCardChoice : null
                }
                isFlipped={clickedList.includes(idx) || card.matchedStatus}
              />
            </StCardWrapper>
          </>
        );
      })}
    </StCardsContainer>
  );
};

export default CardSection;

const StCardsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 8rem;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;

const StCardWrapper = styled.article`
  margin: 1rem;
  width: 20rem;
  height: 25rem;
  perspective: 100rem;
`;
