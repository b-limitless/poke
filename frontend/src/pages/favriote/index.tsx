import { useMutation, useQuery } from "@tanstack/react-query";
import Template from "common/Template/Template";
import { detailsInitialState } from "config/initial-states";
import useCurrentUser from "hooks/useCurrentUser";
import Navigation from "layouts/navigation/navigation";
import PokemonCard from "layouts/pokemon-card";
import { addOrRemoveFromFavorite } from "pages/api-requests/addOrRemoveFromFavorite";
import {
  fetchFevorites
} from "pages/api-requests/fetchFevorites";
import { fetchPokemonDetails } from "pages/api-requests/fetchPokemonDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IPokemon,
  setFavorites,
  toggleFavoriteAction
} from "slices/favoritesSlice";
import { RootState } from "store/store";


export default function Home() {
  const [hoveredPokemonId, setHoveredPokemonId] = useState<number>(1);
  const dispatch = useDispatch();
  const myFavorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser({ shouldNavigate: false });

  const {
    data: favorites,
    error: favoritesError,
    isLoading: favoritesLoading,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => {
      if (!isAuthenticated) return [];
      return fetchFevorites();
    },
    enabled: isAuthenticated,
  });

  const {
    mutate: toggleFavoriteMutation,
    isPending: isPendingFavorite,
    
    error: favoriteError,
  } = useMutation({
    mutationFn: addOrRemoveFromFavorite,
    onMutate: () => {
      if (!isAuthenticated) {
        navigate("/signin");
      }
    },
    onSuccess: (data: any) => {
      dispatch(toggleFavoriteAction(data));
    },
  });

  const toggleFavorite = (pokemon: IPokemon) => {
    toggleFavoriteMutation(pokemon.pokemonId);
  };

  const {
    data: pokemonDetails,
    error: pokemonDetailsError,
    isLoading: pokemonDetailsLoading,
  } = useQuery({
    queryKey: ["pokemonDetails", hoveredPokemonId],
    queryFn: () => fetchPokemonDetails(hoveredPokemonId),
    enabled: hoveredPokemonId !== null,
  });

  const handleHover = (id: number) => {
    setHoveredPokemonId(id);
  };

  useEffect(() => {
    dispatch(setFavorites(favorites));
  }, [favorites]);

  return (
    <Template>
      <Navigation />
      {pokemonDetailsError && (
        <div>
          {" "}
          Error while fetching pokemon details {pokemonDetailsError.toString()}
        </div>
      )}

      {favoritesError && <div>{favoritesError.toString()}</div>}

      {favoriteError && <div> {favoriteError.toString()}</div>}

      <div className="pokemon-list" id="pokemon-list">
        {!favoritesLoading &&
          myFavorites?.length > 0 &&
          myFavorites?.map((pokemon: any, i:number) => (
            <PokemonCard
              key={pokemon.pokemonId}
              pokemon={pokemon}
              toggleFavorite={isPendingFavorite ? () => {} : toggleFavorite}
              onHover={handleHover}
              backgroundColor={"green"}
              myFavriotes={
                myFavorites?.map((pokemon: IPokemon) =>
                  Number(pokemon.pokemonId)
                ) ?? []
              }
              details={pokemonDetails ?? detailsInitialState}
              loadingDetails={pokemonDetailsLoading}
              onMouseLeave={() => {}}
            />
          ))}
      </div>
    
    </Template>
  );
}
