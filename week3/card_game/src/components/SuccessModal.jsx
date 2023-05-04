import styled from "styled-components";
import reactDom from "react-dom";

export const SuccessModal = ({ handleModalClose }) => {
  // createPortal로 모달을 띄울 영역을 잡아주기 위한 변수
  const modalRoot = document.getElementById("modal-root");

  return reactDom.createPortal(
    <StModalContainer>
      <StModalWrapper>
        <p>🥳🥳🥳 축하합니다!! 🥳🥳🥳</p>
        <StModalBtnWrapper>
          <button type="button" onClick={handleModalClose}>
            게임으로 돌아가기
          </button>
        </StModalBtnWrapper>
      </StModalWrapper>
    </StModalContainer>,
    modalRoot
  );
};

export default SuccessModal;

const StModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
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
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.lightPink};
  border-radius: 1rem;
  font-size: 6rem;
  & > p {
    margin-bottom: 4rem;
  }
`;

const StModalBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  & > button {
    width: 100%;
    padding: 2rem;
    font-size: 2.3rem;
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
    border: 0;
    border-radius: 1rem;
  }
`;
