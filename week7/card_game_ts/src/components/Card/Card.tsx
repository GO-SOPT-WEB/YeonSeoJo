import { useState } from "react";
import styled from "styled-components";

import { CardObject } from "../../types/card";

interface CardProps {
  idx: number;
  card: CardObject;
  handleCardChoice: ((card: CardObject, idx: number) => void) | null;
  isFlipped: boolean;
}

export const Card = ({ idx, card, handleCardChoice, isFlipped }: CardProps) => {
  //카드 중복 클릭 시 같은 쌍이 뒤집히는 에러 핸들링 용 state 추가
  const [isClicked, setIsClicked] = useState(false);
  const { imgSrc, alt } = card;

  const handleCardClick = () => {
    // 2개 이상 선택하지 않았고 중복 클릭이 아니면 클릭 이벤트에서 cardSection에서 정의한 handleCardChoice 함수 실행
    if (handleCardChoice !== null && isClicked === false) {
      handleCardChoice(card, idx);
      setIsClicked(true);
      // 이미 클릭 된 카드가 또 클릭되지 않도록 setTimeOut 함수로 0.5초 동안 클릭 이벤트 방지
      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  return (
    <StCardFace>
      <StCardFront isFlipped={isFlipped} onClick={handleCardClick}>
        💖
      </StCardFront>
      <StCardBack isFlipped={isFlipped}>
        <img src={imgSrc} alt={alt} />
      </StCardBack>
    </StCardFace>
  );
};

export default Card;

const StCardFace = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const StCard = styled.div<{ isFlipped: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  backface-visibility: hidden;
  transition: 0.7s;
  transform-style: preserve-3d;
  cursor: pointer;
`;

// 카드 뒷면을 ratateY(180deg)로 먼저 뒤집어 놓고, flipped 되면 앞 면과 뒷면의 rotate를 180도씩 바꿔 뒤집기 구현
const StCardFront = styled(StCard)`
  background-color: ${({ theme }) => theme.colors.greyPurple};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.lightPink};
  font-size: 3rem;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const StCardBack = styled(StCard)`
  background-color: ${({ theme }) => theme.colors.lightPink};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.greyPurple};
  & > img {
    width: 70%;
    height: 70%;
    border-radius: 1rem;
    border: 0.5rem solid ${({ theme }) => theme.colors.lightYellow};
  }
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(360deg)" : "rotateY(180deg)"};
`;
