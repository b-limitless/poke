import React from "react";
import "./pokemon.card.scss";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IPokemon } from "slices/favoritesSlice";
import { getRandomTypeColor } from "config/colors";

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
  toggleFavorite: (pokemon: IPokemon) => void;
  onHover: (id: number) => void;
  onMouseLeave?: () => void; 
  backgroundColor: string;
  myFavriotes: number[];
  details?: any;
  loadingDetails?:boolean; 
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  details,
  myFavriotes,
  pokemon,
  toggleFavorite,
  onHover,
  backgroundColor,
  loadingDetails, 
  onMouseLeave
}) => {
  const {  name, pokemonId } = pokemon;
  const { abilities, types, evolutions } = details;

  return (
    <div
      className="pokemon-card"
      onMouseEnter={() => onHover(Number(pokemonId))} // Trigger on hover event
      onMouseLeave={() => onMouseLeave} // Reset on hover out
    >
      <div className="pokemon-card-inner">
        <div
          className="pokemon-card-front"
          style={{ backgroundColor: '#fff' }} // Set background color based on Pokémon type
        >
          <img
            className="pokemon-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt={name}
            loading="lazy"
          />
          <h2 className="pokemon-name">{name}</h2>
          {/* <p className="pokemon-type">{types.join(" / ")}</p> */}
          <div className="favorite-icon" onClick={() => null}>
            {myFavriotes &&  myFavriotes?.includes(Number(pokemonId)) ? (
              <Favorite sx={{ color: "red" }} /> // Filled heart when favorite
            ) : null // Outline heart when not favorite
            }
          </div>
        </div>
        <div
          className="pokemon-card-back"
          style={{ backgroundColor: 
            getRandomTypeColor(types)
           }} // Set background color based on Pokémon type
        >
        

          {!loadingDetails && <div className="pokemon-tags">
            Ability
            <div className="tags">
              {abilities && abilities?.length > 0 && abilities.map((ability: string) => (
                <span key={ability} className="tag ability">
                  {ability}
                </span>
              ))}
            </div>
            Types
            <div className="tags">
              {types && types.length > 0 && types.map((type: string) => (
                <span key={type} className="tag type">
                  {type}
                </span>
              ))}
            </div>
            Evolutions
            <div className="tags">
              {evolutions && evolutions.length > 0 && evolutions.map((evolution: string) => (
                <span key={evolution} className="tag evolution">
                  {evolution}
                </span>
              ))}
            </div>
          </div>}

          {loadingDetails && <div>Please wait loading....</div>}

          {myFavriotes && myFavriotes?.includes(Number(pokemonId)) ? (
            <Favorite
              sx={{ color: "red" }}
              onClick={() => toggleFavorite(pokemon as any)}
            /> // Filled heart when favorite
          ) : (
            <FavoriteBorder
              sx={{ color: "gray" }}
              onClick={() => toggleFavorite(pokemon as any)}
            /> // Outline heart when not favorite
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
