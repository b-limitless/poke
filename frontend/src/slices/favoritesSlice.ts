import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Pokémon type (you can adjust this based on your structure)
interface Pokemon {
  pokemonId: number;
  name: string;
  imageUrl: string;
  // Add other properties of Pokémon here
}

// Define initial state
interface FavoritesState {
  favorites: Pokemon[];
}

const initialState: FavoritesState = {
  favorites: [],
};

// Create slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Add favorite Pokémon
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload);
    },

    // Remove favorite Pokémon by id
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.pokemonId !== action.payload
      );
    },

    // Set favorites list (useful for initial loading from the backend)
    setFavorites: (state, action: PayloadAction<Pokemon[]>) => {
      state.favorites = action.payload;
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

// Export the reducer to be used in the store
export default favoritesSlice.reducer;