import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ImSearch } from "react-icons/im";

// img
// @ts-ignore
import PokemonCenterIcon from "../../../../assets/img/pokemon-center.icns";

const FakeHeader = styled.div`
  height: 80px;
`;
const Header = styled.header`
  position: fixed;
  height: 80px;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 0 3px 0 gray;
  background: #c4c4c4;
  > .centralizer {
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
`;

const InputContanier = styled.div`
  flex: 1 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const Input = styled.input`
  flex: 1 1 auto;
  height: 40px;
  font-size: 40px;
  border: none;
  background: transparent;
  outline: none;
  ::placeholder {
    color: black;
  }
`;

interface IPokemonCenterButton {
  countAnimation: boolean;
}

const nodding = keyframes`
  0% {
    transform: translateY(-20%);
  }
  50% {
    transform: translateY(20%);
  }
  100%{
    transform: translateY(0);
  }
`;

const PokemonCenterButton = styled.button<IPokemonCenterButton>`
  position: relative;
  display: flex;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  img {
    height: 100%;
    border-radius: 100%;
    :hover {
      transform: scale(1.05);
    }
  }
  strong {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    color: red;
    background: white;
    border: 3px solid black;
    border-radius: 100%;
    box-sizing: border-box;
    /* animation: ${({ countAnimation }) =>
      countAnimation ? "nodding" : "none"}; */
    animation: ${({ countAnimation }) => (countAnimation ? nodding : "none")}
      0.3s linear;
  }
`;

interface ISearchHeader {
  searchFunction: (inputValue: string) => void;
  buttonFunction?: () => void;
  cartItemQuantity: number;
}

export const SearchHeader: FC<ISearchHeader> = ({
  searchFunction,
  buttonFunction,
  cartItemQuantity,
}) => {
  const [countAnimation, setCountAnimation] = useState(false);
  const userInputTypeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchFunction(value.toLowerCase());
  };

  const ativateCountAnimation = useCallback(() => {
    setCountAnimation(true);
    setTimeout(() => {
      setCountAnimation(false);
    }, 500);
  }, [countAnimation]);

  useEffect(() => {
    ativateCountAnimation();
  }, [cartItemQuantity]);

  return (
    <>
      <FakeHeader />
      <Header>
        <div className="centralizer">
          <InputContanier>
            <ImSearch size="40px" />
            <Input placeholder="pesquisar" onChange={userInputTypeHandler} />
          </InputContanier>
          <PokemonCenterButton
            onClick={buttonFunction}
            countAnimation={countAnimation}
          >
            <img src={PokemonCenterIcon} alt="pokemon-center" />
            {cartItemQuantity > 0 && <strong>{cartItemQuantity}</strong>}
          </PokemonCenterButton>
        </div>
      </Header>
    </>
  );
};
