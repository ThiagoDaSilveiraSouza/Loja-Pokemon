import { useCallback, useEffect, useState } from "react";

// Home components
import { SearchHeader, CardContainer, Cart, FinishModal } from "./components";

// services
import { getAllPokemon } from "../../services";
import { IPokemon } from "../../interfaces";
import { GetCart, AddPokemonToCart, RemovePokemonFromCart } from "../../utils";

export const Home = () => {
  const [cart, setCart] = useState<IPokemon[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [allPokemon, setAllPokemon] = useState<IPokemon[]>([]);
  const [userInputValue, setUserInputValue] = useState<string>("");
  const [finishModalIsOpen, setFinishModalIsOpen] = useState<boolean>(false)
  const allPokemonFilteredByInput = allPokemon.filter((pokemon) => pokemon.name.includes(userInputValue))

  const updateAllPokemon = useCallback(async () => {
    const caughtAllPokemon = await getAllPokemon();
    setAllPokemon(caughtAllPokemon);
  }, [setAllPokemon])

  const searchFunction = (inputValue: string) => {
    setUserInputValue(inputValue);
  };

  const addPokemonToCartFunction = (pokemon: IPokemon) => {
    AddPokemonToCart(pokemon, setCart);
    setCartIsOpen(true);
  }

  const removePokemonToCartFunction = (pokemon: IPokemon) => {
    RemovePokemonFromCart(pokemon, setCart);
    setCartIsOpen(true);
  }
  const createTeamButtonFunction = () => {
    setFinishModalIsOpen(true)
    setCartIsOpen(false)
  }
  useEffect(() => {
    updateAllPokemon();
  }, [updateAllPokemon]);

  useEffect(() => {
    GetCart(setCart);
  }, []);
  useEffect(() => {
    console.log("cart Atualizou", cart);
  }, [cart]);

  return (
    <div>
      <SearchHeader searchFunction={searchFunction} />
      <CardContainer
        allPokemon={allPokemonFilteredByInput}
        addToCartFunction={addPokemonToCartFunction}
      />
      <Cart
        addPokemon={addPokemonToCartFunction}
        removePokemon={removePokemonToCartFunction}
        useCart={{ cartIsOpen, setCartIsOpen }}
        pokemonCartList={cart}
        createTeamButtonFunction={createTeamButtonFunction}
      />
      <FinishModal useModal={{ finishModalIsOpen, setFinishModalIsOpen }} />
    </div>
  );
};
