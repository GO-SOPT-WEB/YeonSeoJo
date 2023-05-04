import styled from "styled-components";

export const ResetBtn = ({ setIsReset }) => {
  return (
    <>
      <StBtnWrapper>
        <StResetBtn type="button" onClick={() => setIsReset(true)}>
          RESET
        </StResetBtn>
      </StBtnWrapper>
      ;
    </>
  );
};

export default ResetBtn;

const StBtnWrapper = styled.aside`
  display: flex;
  position: absolute;
  top: 4rem;
  right: 4rem;
`;

const StResetBtn = styled.button`
  display: flex;
  padding: 1.5rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: 4rem;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem ${({ theme }) => theme.colors.darkPink};
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.purple};
  }
`;
