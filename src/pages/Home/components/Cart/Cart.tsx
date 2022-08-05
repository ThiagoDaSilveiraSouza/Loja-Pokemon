import { Dispatch, FC, SetStateAction, useMemo } from "react";
import styled from "styled-components";
import { IPokemon } from "../../../../interfaces";

// Cart components
import { CartItem } from "./components";

interface ICartContainer {
  cartIsOpen: boolean;
}

const CartContainer = styled.div<ICartContainer>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  visibility: ${({ cartIsOpen }) => (cartIsOpen ? "visible" : "hidden")};
  animation-delay: 0.5s;
`;
const CartBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const CartCard = styled.div<ICartContainer>`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  background: white;
  transform: ${({ cartIsOpen }) =>
    cartIsOpen ? "translateX(0)" : "translateX(100%)"};
  transition: 0.3s;
  `;

const PokemonCartListContainer = styled.div`
  flex: 1 1 80%;
  width: 100%;
  overflow-y: auto;
  border-bottom: 1px solid black;
`

const CheckoutContainer = styled.div`
  flex: 1 1 20%;
  button{
    font-size: 30px;
  }
`

interface ICart {
  useCart: {
    cartIsOpen: boolean;
    setCartIsOpen: Dispatch<SetStateAction<boolean>>;
  };
  pokemonCartList: IPokemon[];
  addPokemon: (pokemon: IPokemon) => void;
  removePokemon: (pokemon: IPokemon) => void;
  createTeamButtonFunction: () => void
}

export const Cart: FC<ICart> = ({
  useCart,
  pokemonCartList,
  addPokemon,
  removePokemon,
  createTeamButtonFunction
}) => {
  const { cartIsOpen, setCartIsOpen } = useCart;
  const cartTotalXp = useMemo(() => pokemonCartList.reduce<number>((totalXp, currenPokemon) => {
    if (currenPokemon?.quantity) {
      const total = totalXp + (currenPokemon.base_experience * currenPokemon.quantity)
      console.log(total)
      return total
    }
    return 0
  }, 0), [pokemonCartList])

  const closeCart = () => {
    setCartIsOpen(false);
  };

  return (
    <CartContainer cartIsOpen={cartIsOpen}>
      <CartBg onClick={closeCart} />
      <CartCard cartIsOpen={cartIsOpen}>
        <h2>Cart</h2>
        <PokemonCartListContainer>
          {pokemonCartList.map((pokemon) => (
            <CartItem
              key={pokemon.name}
              pokemon={pokemon}
              decreasePokemonFunction={() => removePokemon(pokemon)}
              plusPokemonFunction={() => addPokemon(pokemon)}
            />
          ))}
        </PokemonCartListContainer>
        <CheckoutContainer>
          <h2>Total XP: {cartTotalXp}</h2>
          <button onClick={createTeamButtonFunction}>Create team</button>
        </CheckoutContainer>
      </CartCard>
    </CartContainer>
  );
};