import { useMutation, useQuery } from "@tanstack/react-query";
import Template from "common/Template/Template";
import CustomLoadingButton from "components/Button/LoadingButton";
import { useNavigate } from "react-router-dom";
import { APIs } from "utils/apis";
import { request } from "utils/request";
import ErrorText from "components/Help/ErrorText";
import useCurrentUser from "hooks/useCurrentUser";
import { useEffect, useState } from "react";
import PokemonCard from "layouts/pokemon-card";
import { detailsInitialState } from "config/initial-states";
import Navigation from "layouts/navigation/navigation";
import { fetchPokemonDetails } from "pages/api-requests/fetchPokemonDetails";
import { addOrRemoveFromFavorite } from "pages/api-requests/addOrRemoveFromFavorite";
import { fetchFevoritesIds } from "pages/api-requests/fetchFevorites";
import { fetchFevorites } from "pages/api-requests/fetchFevorites";

const logOutUser = async () => {
  try {
    // Submit the form to service
    await request({
      url: APIs.auth.signout,
      method: "post",
    });
  } catch (err) {
    throw new Error("An unknown error occurred");
  }
};

export default function Favorite() {
  const [myFavorites, setMyFavriote] = useState<any[]>([]);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<number>(1);
  const [myFavriotesIds, setFavriotesIds] = useState<number[]>([]);
  

  // Lets make request to get the current user
  // const navigate = useNavigate();

  // const {
  //   mutate: logOutUserMutation,
  //   isPending,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: logOutUser,
  //   onSuccess: () => {
  //     navigate("/signin");
  //   },
  // });

  // const logouthandler = () => {
  //   // Run mutation
  //   logOutUserMutation();
  // };

  useCurrentUser({});

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

  const { data: myFavoritesQuery, error, isLoading, isError } = useQuery({
    queryKey: ["fetchFavorites"],
    queryFn: fetchFevorites,
  });

  const {
    mutate: toggleFavoriteMutation,
    isPending: isPendingFavorite,
    isError: isFavoriteError,
    error: favoriteError,
  } = useMutation({
    mutationFn: addOrRemoveFromFavorite,
    onSuccess: (_data, id) => {
      setFavriotesIds((prev: number[]) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
       setMyFavriote([...myFavorites.filter((pokemon:any) => Number(pokemon.pokemonId) !== Number(id))])
    },
  });

  const toggleFavorite = (id: number) => {
    toggleFavoriteMutation(id);
  };

  const {
    data: myFavriotesIdsLocal,
    error: favIdsError,
    isLoading: favIdsLoading,
  } = useQuery({
    queryKey: ["fetchFevoritesIds"],
    queryFn: () => {
      return fetchFevoritesIds();
    },
  });

  useEffect(() => {
    setFavriotesIds(myFavriotesIdsLocal);
  }, []);

  useEffect( () => {
    setMyFavriote(myFavoritesQuery)
  }, []);

  return (
    <Template>
      <Navigation />
      <div className="pokemon-list" id="pokemon-list">
        {!isLoading &&
          myFavorites?.length > 0 &&
          myFavorites?.map((pokemon: any, i:number) => (
            <PokemonCard
              key={pokemon.pokemonId}
              pokemon={pokemon}
              toggleFavorite={toggleFavorite}
              onHover={handleHover}
              backgroundColor={"green"}
              myFavriotes={myFavorites}
              details={pokemonDetails ?? detailsInitialState}
            />
          ))}
      </div>
    </Template>
  );
}
