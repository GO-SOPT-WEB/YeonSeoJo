import styled from "styled-components";
import reactDom from "react-dom";
// import { useState } from "react";

export const SuccessModal = ({ currScore, totalScore }) => {
  const modalRoot = document.getElementById("modal-root");
  //   const [isOpened, setIsOpened] = useState(false);

  if (currScore === totalScore) {
    return reactDom.createPortal(
      <StModalContainer>
        <StModalWrapper>
          <p>🥳🥳🥳 축하합니다 🥳🥳🥳</p>
          <StModalBtnWrapper>
            <button type="button">게임으로 돌아가기</button>
          </StModalBtnWrapper>
        </StModalWrapper>
      </StModalContainer>,
      modalRoot
    );
  }
  return null;
};

export default SuccessModal;

const StModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 6rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const StModalWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 5rem;
  background-color: ${({ theme }) => theme.colors.lightPink};
  border-radius: 1rem;
  font-size: 5rem;
`;

const StModalBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 2rem;
  & > button {
    width: 100%;
    padding: 1.5rem;
    font-size: 1.8rem;
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
    border: 0;
    border-radius: 1rem;
  }
`;
