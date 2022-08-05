import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";

const Header = styled.header`
  height: 80px;
  background: #c4c4c4;
  > .centralizer {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
  }
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

interface ISearchHeader {
  searchFunction: (inputValue: string) => void;
}

export const SearchHeader: FC<ISearchHeader> = ({ searchFunction }) => {
  const userInputTypeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchFunction(value.toLowerCase());
  };
  return (
    <Header>
      <div className="centralizer">
        <ImSearch size="40px" />
        <Input placeholder="pesquisar" onChange={userInputTypeHandler} />
      </div>
    </Header>
  );
};
