import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

// interfaces
import { IPokemon } from "../interfaces";

// utils
import { saveLocalStorage, getLocalStorage } from "./useLocalStorage";

const addPokemonToPokemonList = (
  pokemon: IPokemon,
  pokemonList: IPokemon[]
) => {
  const targetPokemonOnTargetList = pokemonList.find(
    ({ id }) => id === pokemon.id
  );


  if (targetPokemonOnTargetList?.quantity) {
    targetPokemonOnTargetList.quantity = targetPokemonOnTargetList.quantity + 1;
    return pokemonList;
  }

  pokemon.quantity = 1;
  return [...pokemonList, pokemon];
};

const removePokemonFromPokemonList = (
  pokemon: IPokemon,
  pokemonList: IPokemon[]
) => {
  const targetPokemonOnTargetList = pokemonList.find(
    ({ id }) => id === pokemon.id
  );

  if (targetPokemonOnTargetList?.quantity) {
    const targetPokemonQuantityGreaterThanOne =
      targetPokemonOnTargetList.quantity > 1;

    if (targetPokemonQuantityGreaterThanOne) {
      targetPokemonOnTargetList.quantity = targetPokemonOnTargetList.quantity - 1;
      return pokemonList;
    }

    const updatedPokemonList = pokemonList.reduce<IPokemon[]>(
      (updatedPokemonList, currentPokemon) => {
        const isTargetPokemon = currentPokemon.id === pokemon.id;

        if (!isTargetPokemon) {
          updatedPokemonList.push(currentPokemon);
        }

        return updatedPokemonList;
      },
      []
    );
    return updatedPokemonList;
  }
  return pokemonList;
};

export const GetCart = (setCart: Dispatch<SetStateAction<IPokemon[]>>) => {
  const cartFromLocalStorage = getLocalStorage<IPokemon[]>("cart");

  setCart(cartFromLocalStorage);
};

export const AddPokemonToCart = (
  pokemon: IPokemon,
  setCart: Dispatch<SetStateAction<IPokemon[]>>
) => {
  setCart((cart) => {
    const newCart = addPokemonToPokemonList(pokemon, cart)
    saveLocalStorage("cart", newCart);
    return [...newCart]
  });
};

export const RemovePokemonFromCart = (
  pokemon: IPokemon,
  setCart: Dispatch<SetStateAction<IPokemon[]>>
) => {
  setCart((cart) => {
    const updatedCart = removePokemonFromPokemonList(pokemon, cart);
    saveLocalStorage("cart", updatedCart);
    return [...updatedCart]
  });
};

export const ClearCart = (setCart: Dispatch<SetStateAction<IPokemon[]>>) => {
  setCart([]);
  saveLocalStorage("cart", []);
};
