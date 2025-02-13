import React from "react";
import "./pokemon.card.scss";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// Define the interface for Pokémon data
interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite: boolean;
  pokemonId: number;
}

// Define props interface
interface PokemonCardProps {
  pokemon: Pokemon;
  toggleFavorite: (id: number) => void;
  onHover: (id: number) => void;
  backgroundColor: string;
  myFavriotes: number[]
}

const PokemonCard: React.FC<PokemonCardProps> = ({myFavriotes, pokemon, toggleFavorite, onHover, backgroundColor }) => {
  const { id, name, image, types, isFavorite, pokemonId } = pokemon;

  return (
    <div
      className="pokemon-card"
      onMouseEnter={() => onHover(id)}  // Trigger on hover event
      onMouseLeave={() => onHover(-1)} // Reset on hover out
    >
      <div className="pokemon-card-inner">
        <div
          className="pokemon-card-front"
          style={{ backgroundColor }} // Set background color based on Pokémon type
        >
          <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`} alt={name} />
          <h2 className="pokemon-name">{name}</h2>
          {/* <p className="pokemon-type">{types.join(" / ")}</p> */}
          <div className="favorite-icon" onClick={() => null}>
            {myFavriotes.includes(pokemonId) ? (
              <Favorite sx={{ color: "red" }} /> // Filled heart when favorite
            ) : (
              null // Outline heart when not favorite
            )}
          </div>
        </div>
        <div
          className="pokemon-card-back"
          style={{ backgroundColor }} // Set background color based on Pokémon type
        >
          <div className="pokemon-info">
            <p><strong>Abilities:</strong> Overgrow, Chlorophyll</p>
            <p><strong>Height:</strong> 7</p>
            <p><strong>Weight:</strong> 69</p>
          </div>

           {isFavorite ? (
              <Favorite sx={{ color: "red" }} onClick={() => toggleFavorite(pokemonId)}/> // Filled heart when favorite
            ) : (
              <FavoriteBorder sx={{ color: "gray" }} onClick={() => toggleFavorite(pokemonId)}/> // Outline heart when not favorite
            )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;