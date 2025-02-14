import { useMutation, useQuery } from "@tanstack/react-query";
import Template from "common/Template/Template";
import { detailsInitialState } from "config/initial-states";
import useCurrentUser from "hooks/useCurrentUser";
import useScrollToEnd from "hooks/useScrollToEnd";
import Navigation from "layouts/navigation/navigation";
import PokemonCard from "layouts/pokemon-card";
import { addOrRemoveFromFavorite } from "pages/api-requests/addOrRemoveFromFavorite";
import { fetchFevoritesIds } from "pages/api-requests/fetchFevorites";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIs } from "utils/apis";
import { request } from "utils/request";
import "./home.scss";
import { fetchPokemonDetails } from "pages/api-requests/fetchPokemonDetails";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite: boolean;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [myFavriotes, setMyFavriote] = useState<number[]>([]);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<number>(1);

  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser({ shouldNavigate: false });

  const fetchPokemons = async (page: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await request({
        url: APIs.pokemon.index(page),
        method: "get",
      });

      if (response?.results) {
        setPokemons((prev) => [...prev, ...response.results]);
      }

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const {
    data: myFavriotesIds,
    error: favIdsError,
    isLoading: favIdsLoading,
  } = useQuery({
    queryKey: ["fetchFevoritesIds", isAuthenticated],
    queryFn: () => {
      if (!isAuthenticated) return [];
      return fetchFevoritesIds();
    },
  });

  useEffect(() => {
    setMyFavriote(myFavriotesIds);
  }, [myFavriotesIds]);

  const {
    mutate: toggleFavoriteMutation,
    isPending: isPendingFavorite,
    isError: isFavoriteError,
    error: favoriteError,
  } = useMutation({
    mutationFn: addOrRemoveFromFavorite,
    onMutate: () => {
      if (!isAuthenticated) {
        navigate("/signin");
      }
    },
    onSuccess: (_data, id) => {
      setMyFavriote((prev: number[]) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    },
  });

  const toggleFavorite = (id: number) => {
    toggleFavoriteMutation(id);
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

  useScrollToEnd("pokemon-list", () => {
    setPage((page) => page + 1);
    setLoadingMore(true);
  });

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  return (
    <Template>
      <Navigation />

      <div className="pokemon-list" id="pokemon-list">
        {!loading &&
          pokemons.length > 0 &&
          pokemons.map((pokemon: any, i) => (
            <PokemonCard
              key={pokemon.pokemonId}
              pokemon={pokemon}
              toggleFavorite={toggleFavorite}
              onHover={handleHover}
              backgroundColor={"green"}
              myFavriotes={myFavriotes}
              details={pokemonDetails ?? detailsInitialState}
              loadingDetails={pokemonDetailsLoading}
              onMouseLeave={() => {}}
            />
          ))}
      </div>
      {loadingMore && <div>Please wait loading.....</div>}
    </Template>
  );
}
