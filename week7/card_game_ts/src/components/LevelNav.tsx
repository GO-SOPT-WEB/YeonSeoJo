import { useRecoilState } from "recoil";
import styled from "styled-components";

import { currLevelSelector } from "../recoil/selector";

export const LevelNav = () => {
  // 현재 level 값을 recoil의 gameStateAtom에서 관리하며, 그 중 level 정보만 필요할 때는 currLevelSelector에서 값을 불러오고 설정해줌.
  const [currLevel, setCurrLevel] = useRecoilState(currLevelSelector);
  // 선택할 수 있는 레벨 리스트
  const levelList = ["EASY", "NORMAL", "HARD"];

  // 선택된 레벨로 currLevel 값을 바꿔주는 함수
  const handleClickLevel = (level: string) => {
    setCurrLevel(level);
  };

  return (
    <>
      <StLevelBtnContainer>
        {levelList.map((level) => {
          return (
            <StLevelBtn
              key={level}
              id={level}
              type="button"
              onClick={() => handleClickLevel(level)}
              selected={level === currLevel ? true : false}
            >
              {level}
            </StLevelBtn>
          );
        })}
      </StLevelBtnContainer>
    </>
  );
};

export default LevelNav;

const StLevelBtnContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
`;

const StLevelBtn = styled.button<{ selected: boolean }>`
  padding: 1.5rem 1.8rem;
  margin-right: 2rem;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.lightPink};
  border: none;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.3rem ${({ theme }) => theme.colors.lightPurple};
  font-size: 1.8rem;
  font-weight: 700;
`;
