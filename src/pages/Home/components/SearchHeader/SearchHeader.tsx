import { ChangeEvent, FC } from "react";
import styled from "styled-components";
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
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const Input = styled.input`
  height: 40px;
  font-size: 40px;
  border: none;
  background: transparent;
  outline: none;
  ::placeholder {
    color: black;
  }
`;

const PokemonCenterButton = styled.button`
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
`;

interface ISearchHeader {
  searchFunction: (inputValue: string) => void;
  buttonFunction?: () => void;
}

export const SearchHeader: FC<ISearchHeader> = ({
  searchFunction,
  buttonFunction,
}) => {
  const userInputTypeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchFunction(value.toLowerCase());
    console.log(value);
  };

  return (
    <>
      <FakeHeader />
      <Header>
        <div className="centralizer">
          <InputContanier>
            <ImSearch size="40px" />
            <Input placeholder="pesquisar" onChange={userInputTypeHandler} />
          </InputContanier>
          <PokemonCenterButton onClick={buttonFunction}>
            <img src={PokemonCenterIcon} alt="pokemon-center" />
          </PokemonCenterButton>
        </div>
      </Header>
    </>
  );
};
