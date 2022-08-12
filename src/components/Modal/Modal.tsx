import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IConfigs {
  cardPosition?: "left" | "right" | "center";
  cardBackgroundColor?: string;
  cardWidht: string;
}

interface IModalContainer {
  modalIsShow: boolean;
  configs?: IConfigs;
}

const ModalContainer = styled.div<IModalContainer>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  animation-delay: 0.3s;
  visibility: ${({ modalIsShow }) => (modalIsShow ? "visible" : "hidden")};
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  user-select: none;
  cursor: pointer;

  :hover {
    transform: scale(1.3);
  }

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background: black;
  }
  ::before {
    transform: rotate(-45deg);
  }
  ::after {
    transform: rotate(45deg);
  }
`;

const ModalCard = styled.div<IModalContainer>`
  position: absolute;
  padding: 20px;
  opacity: ${({ modalIsShow }) => (modalIsShow ? "1" : "0")};
  background: ${({ configs }) =>
    (configs?.cardBackgroundColor && configs?.cardBackgroundColor) || "white"};
  width: ${({ configs }) =>
    (configs?.cardWidht && configs?.cardWidht) || "450px"};
  max-width: 90%;
  overflow-y: auto;
  box-sizing: border-box;
  transform: ${({ modalIsShow }) =>
    modalIsShow ? "translateY(0)" : "translateY(-100%)"};
  transition: 0.4s;

  @media (max-width: 400px) {
    max-width: 100%;
    height: 100%;
  }
`;

interface IModal {
  useModalIsShow: {
    modalIsShow: boolean;
    setModalIsShow: Dispatch<SetStateAction<boolean>>;
  };
  configs?: IConfigs;
}

export const Modal: FC<IModal> = ({
  useModalIsShow: useModalDescriptionIsShow,
  children,
  configs,
}) => {
  const { modalIsShow, setModalIsShow } = useModalDescriptionIsShow;

  return (
    <ModalContainer modalIsShow={modalIsShow}>
      <ModalBg onClick={() => setModalIsShow(false)} />
      <ModalCard modalIsShow={modalIsShow} configs={configs}>
        <ModalCloseButton onClick={() => setModalIsShow(false)} />
        {children}
      </ModalCard>
    </ModalContainer>
  );
};
