import { FC } from "react";
import styled from "styled-components";

// interfaces
import { IPokemon } from "../../../../../../interfaces";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  background: #c4c4c4;
  padding: 10px;
  box-sizing: border-box;
  img {
    flex: 1 1 100%;
    object-fit: contain;
  }
  h3 {
    flex: 1 1 100%;
    text-transform: capitalize;
    margin: 0;
  }
  button {
    cursor: pointer;
  }
`;

const ExperienceContainer = styled.div`
  flex: 1 1 100%;
  justify-content: center;
  display: flex;
  gap: 5px;
`;

interface ICard {
  pokemon: IPokemon;
  buttonFunction?: () => void;
}

export const Card: FC<ICard> = ({ pokemon, buttonFunction }) => {
  return (
    <CardContainer>
      {pokemon.sprites.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <h3>{pokemon.name}</h3>
      <ExperienceContainer>
        <strong>Experience price: </strong>
        <span>{pokemon.base_experience}</span>
      </ExperienceContainer>
      <button onClick={buttonFunction}>Add to cart</button>
    </CardContainer>
  );
};
