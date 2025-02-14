import { useMutation, useQuery } from "@tanstack/react-query";
import Template from "common/Template/Template";
import { detailsInitialState } from "config/initial-states";
import useCurrentUser from "hooks/useCurrentUser";
import useScrollToEnd from "hooks/useScrollToEnd";
import Navigation from "layouts/navigation/navigation";
import PokemonCard from "layouts/pokemon-card";
import { addOrRemoveFromFavorite } from "pages/api-requests/addOrRemoveFromFavorite";
import {
  fetchFevorites,
  fetchPokemonsAPIs,
} from "pages/api-requests/fetchFevorites";
import { fetchPokemonDetails } from "pages/api-requests/fetchPokemonDetails";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IPokemon,
  setFavorites,
  toggleFavoriteAction,
} from "slices/favoritesSlice";
import { RootState } from "store/store";
import { APIs } from "utils/apis";
import { request } from "utils/request";
import "./home.scss";
import PokemonCardSkeleton from "layouts/pokemon-card/Skeleton";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite: boolean;
}

const loaderCount = new Array(10).fill(0);

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<number>(1);
  const dispatch = useDispatch();
  const myFavorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const previousScrollPosition = useRef(0);

  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser({ shouldNavigate: false });

  const fetchPokemons = async () => {
    setLoading(true);

    const response: any = await fetchPokemonsAPIs(0);

    if (response?.results) {
      setPokemons((prev) => [...prev, ...response.results]);
    }

    setLoading(false);
  };

  const fetchPokemonsMore = async (page: number) => {

    const div = scrollableDivRef.current;
    if (div) {
      previousScrollPosition.current = div.scrollTop; // Save scroll position
    }

    setLoadingMore(true);

    const response: any = await fetchPokemonsAPIs(page);

    if (response?.results) {
      setPokemons((prev) => [...prev, ...response.results]);
    }

    setLoadingMore(false);
    requestAnimationFrame(() => {
      if (div) {
        div.scrollTop = previousScrollPosition.current;
      }
    });
  };

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
    isError: isFavoriteError,
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

  useScrollToEnd("pokemon-list", () => {
    setPage((page) => page + 1);
    setLoadingMore(true);
  });

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemonsMore(page);
  }, [page]);

  useEffect(() => {
    dispatch(setFavorites(favorites));
  }, [favorites]);

  useEffect(() => {
    const div = scrollableDivRef.current;
    if (div) {
      requestAnimationFrame(() => {
        div.scrollTop = previousScrollPosition.current;
      });
    }
  });

  return (
    <Template>
      <Navigation />
      {pokemonDetailsError && (
        <div>
          {" "}
          Error while fetching pokemon details {pokemonDetailsError.toString()}
        </div>
      )}

   
      <div className="pokemon-list" id="pokemon-list" ref={scrollableDivRef}>
        {!loading &&
          pokemons?.length > 0 &&
          pokemons?.map((pokemon: any, i) => (
            <PokemonCard
              key={pokemon.pokemonId}
              pokemon={pokemon}
              toggleFavorite={toggleFavorite}
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
      {loadingMore && loaderCount.map((_, i) => <PokemonCardSkeleton key={i}/>)}
    </Template>
  );
}
