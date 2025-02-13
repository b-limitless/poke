import Button from "components/Button";
import axios from "axios";
import Template from "common/Template/Template";
import PokemonCard from "layouts/pokemon-card";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "utils/request";
import "./home.scss";
import useCurrentUser from "hooks/useCurrentUser";

// Define the interface for Pokémon data
interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite: boolean;
}
//  const getBackgroundColor = (types: string[]) => {
//     const typeColors: { [key: string]: string } = {
//       fire: "#f44e42",
//       water: "#4a90e2",
//       grass: "#7cb342",
//       poison: "#7e57c2",
//       // Add more type-color mappings as needed
//     };
//     return '#ffffff';
//     // return types.map((type) => typeColors[type] || "#ffffff").join(", ");
//   };

// const examplePokemons: Pokemon[] = [
//   {
//     id: 1,
//     name: "Charmander",
//     image:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//     types: ["fire"],
//     isFavorite: false,
//   },
//   {
//     id: 2,
//     name: "Squirtle",
//     image: "/squirtle.png",
//     types: ["water"],
//     isFavorite: true,
//   },
//   {
//     id: 3,
//     name: "Bulbasaur",
//     image: "/bulbasaur.png",
//     types: ["grass"],
//     isFavorite: false,
//   },
// ];

const count = new Array(50).fill(0);

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hoveredId, setHoveredId] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [myFavriotes, setMyFavriote] = useState<number[]>([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser({ shouldNavigate: false });

  console.log('isAuthenticated', isAuthenticated)

  const toggleFavorite = useCallback(async (id: number) => {
    if (!isAuthenticated) {
      navigate("/signin");
    }

    try {
      // await request
      await request({
        url: `http://localhost:9000/pokemon/favorite/${id}`,
        method: "post",
      });
      setMyFavriote(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
      console.log('Added/Removed from/to favriote.')
    } catch (err) {
      console.error(`Could not update favriote`, err);
    }
  }, [isAuthenticated]);

  const fetchFevorites = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
    
      const response =  await request({
        url: `http://localhost:9000/pokemon/favorite_ids`,
        method: "get",
      });
      
      console.log('response', response)
      setMyFavriote(response)
      console.log('Fetched favorites')
    } catch (err) {
      console.error(`Could not update favriote`, err);
    }
  }, [isAuthenticated]);

  const fetchPokemons = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await request({
        url: `http://localhost:9000/pokemon?page=${page}`,
        method: "get",
      });

      if (response?.results) {
        setPokemons((prev) => {
          return [...prev, ...response.results];
        });
      }

      setPokemons([...response.results]); // Append new data
      setHasMore(!!response.data.next); // Check if more pages exist
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const handleHover = (id: number) => {
    setHoveredId(id);
  };

 

  useEffect(() => {
    const scrollableDiv = document.getElementById("pokemon-list");

    const handleScroll = () => {
      if (!scrollableDiv) return;
      // Total height of the content
      const scrollHeight = scrollableDiv.scrollHeight;
      // Height of the visible part of the div
      const clientHeight = scrollableDiv.clientHeight;
      // Number of pixels the content has been scrolled vertically
      const scrollTop = scrollableDiv.scrollTop;

      if (scrollTop + clientHeight + 1 > scrollHeight) {
        setPage((page) => page + 1);
        setLoadingMore(true);
        console.log("reach to the end");
      }
    };

    scrollableDiv && scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv &&
        scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchFevorites();
  }, [isAuthenticated])

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  console.log("myFavriotes", myFavriotes);
  // console.log('pokemons', pokemons)
  return (
    <Template>
      <div className="navigation">
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/favorite">Favorite</Link>
        <Link to="/logout">Logout</Link>
      </div>

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
            />
          ))}
      </div>
      {loadingMore && <div>Please wait loading.....</div>}
      {/* <Button variant={"secondary"} text={"Load More"}/> */}
    </Template>
  );
}
