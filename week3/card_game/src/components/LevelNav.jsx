import styled from "styled-components";

export const LevelNav = ({ currLevel, setCurrLevel }) => {
  // 선택할 수 있는 레벨 리스트
  const levelList = ["EASY", "NORMAL", "HARD"];

  return (
    <>
      <StLevelBtnContainer>
        {levelList.map((level) => {
          return (
            <StLevelBtn
              key={level}
              id={level}
              type="button"
              onClick={() => {
                setCurrLevel(level);
              }}
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

const StLevelBtn = styled.button`
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
