import { Dispatch, FC, SetStateAction, useEffect } from "react";

// interfaces
import { IPokemon } from "../../../../../../interfaces";

// data
import { pokemonTypes } from "../../../../../../data";

// components
import { Modal } from "../../../../../../components";
import styled from "styled-components";

const ModalDescriptionContainer = styled.div`
  h2 {
    text-transform: capitalize;
    color: orange;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;

  img {
    position: absolute;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const DataContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 20px 0;
  > * {
    flex: 1 1 180px;
  }
`;

const ContainerTitle = styled.h4`
  text-transform: capitalize;
  box-shadow: 0px 0.5px 0 0 orange;
  color: orange;
  text-align: start;
`;

const StatsList = styled.ul`
  list-style: none;
  text-align: start;
  padding: 0;
  margin: 0;
  li {
    text-transform: capitalize;
  }
`;

const TypesContainer = styled.div`
  div {
    display: flex;
    gap: 5px;
  }
`;

interface ItypeSquad {
  color?: string;
}
const TypeSquad = styled.div<ItypeSquad>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: ${({ color }) => color || "white"};
  border-radius: 5px;
  box-shadow: 0 0 3px 0 gray;
  font-size: 10px;
  color: white;
  text-shadow: 0 0 3px black;
`;

const AddToCartbutton = styled.button`
  cursor: pointer;
`;

interface IModalDescription {
  useSelectedPokemon: {
    selectedPokemon: IPokemon | null;
    setSelectedPokemon: Dispatch<SetStateAction<IPokemon | null>>;
  };
  useModalDescriptionIsShow: {
    modalDescriptionIsShow: boolean;
    setModalDescriptionIsShow: Dispatch<SetStateAction<boolean>>;
  };
  addPokemonToCart: Function;
}

export const ModalDescription: FC<IModalDescription> = ({
  useSelectedPokemon,
  useModalDescriptionIsShow,
  addPokemonToCart,
}) => {
  const { modalDescriptionIsShow, setModalDescriptionIsShow } =
    useModalDescriptionIsShow;
  const { selectedPokemon, setSelectedPokemon } = useSelectedPokemon;

  const buttonHandlerClick = () => {
    addPokemonToCart();
    setModalDescriptionIsShow(false);
  };
  console.log(selectedPokemon);

  useEffect(() => {
    setTimeout(() => {
      !modalDescriptionIsShow && setSelectedPokemon(null);
    }, 300);
  }, [modalDescriptionIsShow]);

  return (
    <Modal
      useModalIsShow={{
        modalIsShow: modalDescriptionIsShow,
        setModalIsShow: setModalDescriptionIsShow,
      }}
    >
      {selectedPokemon && (
        <ModalDescriptionContainer>
          <h2>{selectedPokemon.name}</h2>
          <ImageContainer>
            {selectedPokemon.sprites.front_default && (
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
            )}
          </ImageContainer>
          <DataContainer>
            <TypesContainer>
              <ContainerTitle>Types</ContainerTitle>
              <div>
                {selectedPokemon.types.map(({ type }) => {
                  const typeName = type.name;
                  return (
                    <TypeSquad
                      color={pokemonTypes[typeName].color}
                      key={typeName + "-type"}
                    >
                      <strong>{typeName}</strong>
                    </TypeSquad>
                  );
                })}
              </div>
            </TypesContainer>
            <StatsList>
              <ContainerTitle>Status</ContainerTitle>
              {selectedPokemon.stats.map(({ stat, base_stat }) => (
                <li key={stat.name + "-status"}>
                  <strong>{stat.name}:</strong> {base_stat}
                </li>
              ))}
            </StatsList>
          </DataContainer>
          <AddToCartbutton onClick={buttonHandlerClick}>
            Add to cart
          </AddToCartbutton>
        </ModalDescriptionContainer>
      )}
    </Modal>
  );
};
