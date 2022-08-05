import axios from "axios";
import { api } from "../api";

// interfaces
import { IPokemon } from "../interfaces";

// services
// import { getLocalStorage, saveLocalStorage } from "../utils";

interface IUrlResults {
  name: string;
  url: string;
}

const getAllPokemonFromApi = async () => {
  const pokemonUrlListResponse = await api.get("pokemon?limit=151&offset=0");
  const urlResults: IUrlResults[] = pokemonUrlListResponse.data.results;
  const pokemonPromiseDataList = urlResults.map(({ url }) => axios.get(url));
  const pokemonListResponse = await Promise.all(pokemonPromiseDataList);
  const allPokemon: IPokemon[] = pokemonListResponse.map(({ data }) => data);

  return allPokemon;
};

// const getAllPokmonFromLocalStorage = () => {
//   const allPokemon = getLocalStorage<IPokemon[] | null>("allPokemon");
//   return allPokemon;
// };

// const saveAllPokemonOnLocalStorage = (AllPokemonList: IPokemon[]) => {
//   saveLocalStorage("allPokemon", AllPokemonList);
// };

export const getAllPokemon = async () => {
  // const pokemonFromLocalStorage = getAllPokmonFromLocalStorage() || [];

  // if (pokemonFromLocalStorage && pokemonFromLocalStorage.length > 14) {

  //   console.log("Pegou", pokemonFromLocalStorage)
  //   return pokemonFromLocalStorage;
  // }

  const pokemonFromApi = await getAllPokemonFromApi();

  // if (pokemonFromApi) {
  //   saveAllPokemonOnLocalStorage(pokemonFromApi);
  // }
  return pokemonFromApi || [];
};
