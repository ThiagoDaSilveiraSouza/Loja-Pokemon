import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

// interfaces
import { IPokemon } from "../../../../interfaces";

// CardContainer components
import { Card } from "./components";

const Section = styled.div`
  padding: 30px 0;
  > .centralizer {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    justify-content: center;
    gap: 10px;
    box-sizing: border-box;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(3, 200px);
    }
    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 200px);
    }
    @media (max-width: 500px) {
      grid-template-columns: 200px;
    }
  }
`;

interface ICardContainer {
  allPokemon: IPokemon[];
  addToCartFunction: (pokemon: IPokemon) => void;
}

export const CardContainer: FC<ICardContainer> = ({
  allPokemon,
  addToCartFunction
}) => {
  return (
    <Section>
      <div className="centralizer">
        {allPokemon.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            buttonFunction={() => addToCartFunction(pokemon)}
          />
        ))}
      </div>
    </Section>
  );
};
