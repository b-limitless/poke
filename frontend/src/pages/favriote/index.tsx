import { useMutation } from "@tanstack/react-query";
import Template from "common/Template/Template";
import CustomLoadingButton from "components/Button/LoadingButton";
import { useNavigate } from "react-router-dom";
import { APIs } from "utils/apis";
import { request } from "utils/request";
import ErrorText from "components/Help/ErrorText";
import useCurrentUser from "hooks/useCurrentUser";
import { useEffect, useState } from "react";
import PokemonCard from "layouts/pokemon-card";

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
  const [myFavriotes, setMyFavriote] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const fetchFevorites = async () => {
    setLoading(true);
    try {
      const response = await request({
        url: `http://localhost:9000/pokemon/favorite`,
        method: "get",
      });
      setMyFavriote(response);
      console.log("Fetched favorites");
    } catch (err) {
      console.error(`Could not update favriote`, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFevorites();
  }, [])

  console.log('fav', myFavriotes)

  return (
    <Template>
      
        {!loading &&
          myFavriotes.length > 0 &&
          myFavriotes.map((pokemon: any, i) => (
            <PokemonCard
              key={pokemon.pokemonId}
              pokemon={pokemon}
              toggleFavorite={() => {}}
              onHover={() => {}}
              backgroundColor={"green"}
              myFavriotes={[]}
            />
          ))}
     
      {/* {isError && (
          <ErrorText 
          style={{padding: '1rem 0 1rem 0', textAlign:'center'}}
          text={error?.message || "Something went wrong"} />
        )}

       <CustomLoadingButton
          onClick={logouthandler}
          loading={isPending}
          loadingPosition="start"
          variant="contained"
          type="secondary"
        >
          Logout
        </CustomLoadingButton> */}
      Hello World
    </Template>
  );
}
