import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IFinishContainer {
  modalIsOpen: boolean;
}

const FinishModalContainer = styled.div<IFinishContainer>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ modalIsOpen }) => (modalIsOpen ? "visible" : "hidden")};
  animation-delay: 0.5s;
`;
const FinishModalBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const FinishModalCard = styled.div<IFinishContainer>`
  padding: 10px;
  background: white;
  transform: ${({ modalIsOpen }) =>
    modalIsOpen ? "translateY(0%)" : "translateY(50%)"};
  opacity: ${({ modalIsOpen }) => (modalIsOpen ? 1 : 0)};
  transition: 0.3s;
  max-width: 100vw;
  box-sizing: border-box;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 300px;
    height: 300px;
    max-width: 100%;
    box-sizing: border-box;
    background: #c4c4c4;
    z-index: 1;
    h2,
    h4 {
      margin: 0;
    }
    h2 {
      font-size: 40px;
    }
    h4 {
      font-size: 20px;
    }
    @media (max-width: 650px) {
      h2 {
        font-size: 20px;
      }
      h4 {
        font-size: 12px;
      }
    }
  }
`;

interface IFinishModal {
  useModal: {
    finishModalIsOpen: boolean;
    setFinishModalIsOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export const FinishModal: FC<IFinishModal> = ({ useModal }) => {
  const { finishModalIsOpen, setFinishModalIsOpen } = useModal;

  const closeModal = () => setFinishModalIsOpen(false);

  return (
    <FinishModalContainer modalIsOpen={finishModalIsOpen}>
      <FinishModalBG onClick={closeModal} />
      <FinishModalCard modalIsOpen={finishModalIsOpen}>
        <div>
          <h2>Parabéns</h2>
          <h4>
            Equipe montada<strong>!</strong>
          </h4>
        </div>
      </FinishModalCard>
    </FinishModalContainer>
  );
};
