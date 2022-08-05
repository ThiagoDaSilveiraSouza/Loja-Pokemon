import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

// Home components
import { SearchHeader, CardContainer, Cart, FinishModal } from "./components";

// services
import { getAllPokemon } from "../../services";
import { IPokemon } from "../../interfaces";
import { GetCart, AddPokemonToCart, RemovePokemonFromCart, ClearCart } from "../../utils";

// img
import pokeball from "../../assets/img/pokeball.png"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    width: 200px;   
  }
  h3{
    font-size: 40px;
  }
`

export const Home = () => {
  const [cart, setCart] = useState<IPokemon[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [allPokemon, setAllPokemon] = useState<IPokemon[]>([]);
  const isLoading = useMemo(() => allPokemon.length < 151, [allPokemon])
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
    ClearCart(setCart)
  }
  useEffect(() => {
    updateAllPokemon();
  }, [updateAllPokemon]);

  useEffect(() => {
    GetCart(setCart);
  }, []);


  return (
    <>
      {
        isLoading ?
          (<LoadingContainer>
            <img src={pokeball} alt="pokeball-loading" />
            <h1>Loading...</h1>
          </LoadingContainer>)
          :
          (<div>
            <SearchHeader searchFunction={searchFunction} buttonFunction={() => setCartIsOpen(true)} />
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
          </div>)
      }
    </>
  );
};
