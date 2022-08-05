import { FC, useEffect } from "react";
import styled from "styled-components";

// interfaces
import { IPokemon } from "../../../../../../interfaces";

const CartItemContainer = styled.div`
  padding: 5px;
  box-sizing: border-box;
`;
const CartItemMain = styled.div`
  display: flex;
  gap: 10px;
  text-align: start;
  img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    box-shadow: 0 0 3px 0 gray;
  }
  h3{
    text-transform: capitalize;
    margin: 0;
  }
`;
const CartItemDescription = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CartItemButtonContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  strong{
    width: 30px;
    text-align: center;
  }
  button{
    cursor: pointer;
    user-select: none;
  }

`;

interface ICartItem {
  pokemon: IPokemon;
  decreasePokemonFunction: () => void;
  plusPokemonFunction: () => void;
}

export const CartItem: FC<ICartItem> = ({
  pokemon,
  decreasePokemonFunction,
  plusPokemonFunction
}) => {


  return (
    <CartItemContainer>
      <CartItemMain>
        {pokemon.sprites?.front_default && (
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
        )}
        <CartItemDescription>
          <h3>{pokemon.name}</h3>
          <div>
            <strong>Total XP: </strong>
            {
              pokemon.quantity &&
              <span>{pokemon.base_experience * pokemon.quantity}</span>
            }
          </div>
          <CartItemButtonContent>
            <button onClick={decreasePokemonFunction}>-</button>
            <strong>
              {pokemon.quantity}
            </strong>
            <button onClick={plusPokemonFunction}>+</button>
          </CartItemButtonContent>
        </CartItemDescription>
      </CartItemMain>
    </CartItemContainer>
  );
};
